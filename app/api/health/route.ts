import { NextResponse } from 'next/server'

export async function GET() {
  const hasApiKey = Boolean(process.env.GEMINI_API_KEY)

  return NextResponse.json({
    status: 'ok',
    geminiConfigured: hasApiKey,
    message: hasApiKey
      ? 'Backend is ready. POST /api/analyze with { resume, jobDescription }.'
      : 'Add GEMINI_API_KEY to .env.local and restart npm run dev.',
  })
}
