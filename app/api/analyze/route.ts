import { NextResponse } from 'next/server'
import { analyzeResumeWithGemini, formatGeminiError } from '@/lib/gemini'
import type { AnalyzeRequest } from '@/lib/types/analysis'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyzeRequest
    const resume = body.resume?.trim()
    const jobDescription = body.jobDescription?.trim()

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Both resume and jobDescription are required.' },
        { status: 400 }
      )
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error:
            'GEMINI_API_KEY is missing. Create .env.local with your Gemini API key and restart the dev server.',
        },
        { status: 500 }
      )
    }

    const analysis = await analyzeResumeWithGemini(resume, jobDescription)
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('[api/analyze]', error)
    const formatted = formatGeminiError(error)
    const status = formatted.message.toLowerCase().includes('quota') ? 429 : 500
    return NextResponse.json({ error: formatted.message }, { status })
  }
}
