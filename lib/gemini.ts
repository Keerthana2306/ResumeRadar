import { GoogleGenerativeAI } from '@google/generative-ai'
import type { AnalysisResult } from '@/lib/types/analysis'

function getModelCandidates(): string[] {
  const configured = process.env.GEMINI_MODEL?.trim()
  const defaults = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash'
]

  return [...(configured ? [configured] : []), ...defaults].filter(
    (model, index, models) => models.indexOf(model) === index
  )
}

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set. Add it to .env.local')
  }
  return new GoogleGenerativeAI(apiKey)
}

const ANALYSIS_PROMPT = `You are an expert resume analyst and career coach. Analyze the candidate's resume against the job description.

Return ONLY valid JSON matching this exact shape (no markdown, no extra keys):
{
  "matchScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "summary": "<2-3 sentence overview>",
  "strengths": ["<strength>", ...],
  "missingSkills": ["<skill>", ...],
  "matchedKeywords": ["<keyword>", ...],
  "missingKeywords": ["<keyword>", ...],
  "recommendations": [{ "title": "<short title>", "description": "<actionable advice>" }],
  "interviewQuestions": ["<question>", ...],
  "topicsToRevise": ["<topic>", ...],
  "improvedResume": "<full improved resume text in plain text, keep realistic formatting with sections>"
}

Guidelines:
- Base scores on real alignment between resume and job description
- Provide 3-6 items per list where applicable
- Provide 4-6 recommendations
- Provide 4-5 interview questions tailored to gaps and role
- improvedResume should incorporate your top recommendations while preserving the candidate's real experience

RESUME:
---
{resume}
---

JOB DESCRIPTION:
---
{jobDescription}
---`

export async function analyzeResumeWithGemini(
  resume: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const prompt = ANALYSIS_PROMPT.replace('{resume}', truncate(resume, 12000)).replace(
    '{jobDescription}',
    truncate(jobDescription, 8000)
  )

  const text = await generateAnalysisText(prompt)
  const parsed = parseAnalysisJson(text)

  return {
    matchScore: clampScore(parsed.matchScore),
    atsScore: clampScore(parsed.atsScore),
    summary: parsed.summary ?? '',
    strengths: parsed.strengths ?? [],
    missingSkills: parsed.missingSkills ?? [],
    matchedKeywords: parsed.matchedKeywords ?? [],
    missingKeywords: parsed.missingKeywords ?? [],
    recommendations: parsed.recommendations ?? [],
    interviewQuestions: parsed.interviewQuestions ?? [],
    topicsToRevise: parsed.topicsToRevise ?? [],
    improvedResume: parsed.improvedResume ?? '',
  }
}

async function generateAnalysisText(prompt: string): Promise<string> {
  const genAI = getClient()
  const models = getModelCandidates()
  let lastError: unknown

  for (const modelName of models) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        })

        const result = await model.generateContent(prompt)
        return result.response.text()
      } catch (error) {
        lastError = error

        if (isQuotaError(error)) {
          break
        }

        if (isRateLimitError(error) && attempt === 0) {
          await sleep(getRetryDelayMs(error))
          continue
        }

        throw error
      }
    }
  }

  throw formatGeminiError(lastError)
}

function parseAnalysisJson(text: string): AnalysisResult {
  try {
    return JSON.parse(text) as AnalysisResult
  } catch {
    throw new Error('Gemini returned invalid JSON. Please try again.')
  }
}

function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength)}\n\n[truncated for API limits]`
}

function clampScore(value: number): number {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0
  return Math.min(100, Math.max(0, Math.round(value)))
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function isQuotaError(error: unknown): boolean {
  const message = getErrorMessage(error)
  return message.includes('429') || message.toLowerCase().includes('quota')
}

function isRateLimitError(error: unknown): boolean {
  const message = getErrorMessage(error)
  return message.includes('429') || message.toLowerCase().includes('too many requests')
}

function getRetryDelayMs(error: unknown): number {
  const message = getErrorMessage(error)
  const match = message.match(/retry in ([0-9.]+)s/i)
  if (match) {
    return Math.ceil(parseFloat(match[1]) * 1000)
  }
  return 2000
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

export function formatGeminiError(error: unknown): Error {
  const message = getErrorMessage(error)

  if (isQuotaError(message)) {
    return new Error(
      'Gemini API quota exceeded for the current free-tier models. Wait a minute and try again, or set GEMINI_MODEL=gemini-1.5-flash in .env.local. You can also enable billing at https://ai.google.dev/gemini-api/docs/rate-limits'
    )
  }

  if (message.includes('API key not valid') || message.includes('API_KEY_INVALID')) {
    return new Error('Invalid Gemini API key. Check GEMINI_API_KEY in .env.local and restart the dev server.')
  }

  return error instanceof Error ? error : new Error(message || 'Failed to analyze resume.')
}
