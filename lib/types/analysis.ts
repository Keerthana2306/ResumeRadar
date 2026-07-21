export interface Recommendation {
  title: string
  description: string
}

export interface AnalysisResult {
  matchScore: number
  atsScore: number
  summary: string
  strengths: string[]
  missingSkills: string[]
  matchedKeywords: string[]
  missingKeywords: string[]
  recommendations: Recommendation[]
  interviewQuestions: string[]
  topicsToRevise: string[]
  improvedResume: string
}

export interface AnalyzeRequest {
  resume: string
  jobDescription: string
}
