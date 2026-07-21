'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { UploadPanel } from '@/components/upload-panel'
import { EmptyState } from '@/components/empty-state'
import { ResultsOverview } from '@/components/results-overview'
import { SkillAnalysis } from '@/components/skill-analysis'
import { RecommendationsTimeline } from '@/components/recommendations-timeline'
import { InterviewReadiness } from '@/components/interview-readiness'
import { ResumePreviewImproved } from '@/components/resume-preview-improved'
import type { AnalysisResult } from '@/lib/types/analysis'

export default function Dashboard() {
  const [isAnalyzed, setIsAnalyzed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [visibleSections, setVisibleSections] = useState<number>(0)

  const animateSections = () => {
    let section = 0
    const interval = setInterval(() => {
      section++
      if (section <= 5) {
        setVisibleSections(section)
      } else {
        clearInterval(interval)
      }
    }, 400)
  }

  const handleAnalyze = async (resume: string, jobDescription: string) => {
    setIsLoading(true)
    setVisibleSections(0)
    setError(null)
    setIsAnalyzed(false)
    setAnalysis(null)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error ?? 'Failed to analyze resume.')
      }

      setAnalysis(data as AnalysisResult)
      setIsAnalyzed(true)
      animateSections()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsAnalyzed(false)
    setVisibleSections(0)
    setAnalysis(null)
    setError(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Panel - Upload */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="sticky top-24">
              <UploadPanel onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>
          </motion.div>

          {/* Right Panel - Initial Results */}
          <div>
            {error && (
              <div className="mb-4 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}
            {!isAnalyzed && !isLoading ? (
              <EmptyState />
            ) : (
              <ResultsOverview
                score={analysis?.matchScore ?? 0}
                atsScore={analysis?.atsScore ?? 0}
                summary={analysis?.summary ?? ''}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>

        {/* Analysis Results - Animated Sections */}
        {isAnalyzed && analysis && (
          <motion.div className="space-y-8 pb-8">
            {/* Section 2: Skill Analysis */}
            {visibleSections >= 2 && (
              <SkillAnalysis
                strengths={analysis.strengths}
                missingSkills={analysis.missingSkills}
                matchedKeywords={analysis.matchedKeywords}
                missingKeywords={analysis.missingKeywords}
                isLoading={isLoading}
              />
            )}

            {/* Section 3: Recommendations */}
            {visibleSections >= 3 && (
              <RecommendationsTimeline recommendations={analysis.recommendations} isLoading={isLoading} />
            )}

            {/* Section 4: Interview Readiness */}
            {visibleSections >= 4 && (
              <InterviewReadiness
                interviewQuestions={analysis.interviewQuestions}
                topicsToRevise={analysis.topicsToRevise}
                isLoading={isLoading}
              />
            )}

            {/* Section 5: Resume Preview */}
            {visibleSections >= 5 && (
              <ResumePreviewImproved improvedResume={analysis.improvedResume} isLoading={isLoading} />
            )}

            {/* Reset Button */}
            {visibleSections >= 5 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center pt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="px-8 py-3 border-2 border-border rounded-xl hover:border-primary/50 hover:bg-secondary transition-all font-semibold"
                >
                  Start New Analysis
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  )
}
