'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, X, Download } from 'lucide-react'

interface InputSectionProps {
  title: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onFileUpload?: (fileName: string, content: string) => void
  defaultTab?: 'upload' | 'paste'
}

export function InputSection({
  title,
  placeholder,
  value,
  onChange,
  onFileUpload,
  defaultTab = 'paste',
}: InputSectionProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>(defaultTab)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (file: File) => {
    const sizeInKB = (file.size / 1024).toFixed(2)
    const fileName = file.name

    setUploadedFile({ name: fileName, size: sizeInKB })
    setUploadSuccess(true)

    // Read file content
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      onChange(content)
      onFileUpload?.(fileName, content)
    }
    reader.readAsText(file)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setUploadSuccess(false)
    }, 3000)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ['.pdf', '.docx', '.txt', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
      if (validTypes.some(type => file.type.includes(type.split('/')[1]) || fileExtension === type)) {
        handleFileChange(file)
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileChange(file)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    onChange('')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* Tabs */}
      <div className="flex gap-2 bg-secondary rounded-xl p-1">
        <motion.button
          onClick={() => setActiveTab('upload')}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'upload'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-foreground/60 hover:text-foreground'
          }`}
        >
          Upload {title.split(' ')[0]}
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('paste')}
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
            activeTab === 'paste'
              ? 'bg-card text-foreground shadow-sm'
              : 'text-foreground/60 hover:text-foreground'
          }`}
        >
          Paste {title.split(' ')[0]}
        </motion.button>
      </div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={activeTab}
      >
        {activeTab === 'upload' ? (
          // Upload Tab
          uploadedFile && !uploadSuccess ? (
            <div className="bg-card border-2 border-border rounded-2xl p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
                    <FileText className="text-success" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">✓ {uploadedFile.name}</p>
                    <p className="text-xs text-foreground/60">{uploadedFile.size} KB</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={removeFile}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors text-foreground/60 hover:text-foreground"
                  title="Remove file"
                >
                  <X size={20} />
                </motion.button>
              </motion.div>
            </div>
          ) : (
            <div
              className="bg-card border-2 border-dashed border-border rounded-2xl p-8 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadSuccess && uploadedFile ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-success/10 rounded-xl mb-4">
                    <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 0.6 }}>
                      <FileText className="text-success" size={32} />
                    </motion.div>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    ✓ {uploadedFile.name} uploaded successfully
                  </p>
                  <p className="text-xs text-foreground/60 mt-1">{uploadedFile.size} KB</p>
                </motion.div>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl mb-4">
                    <Upload className="text-primary" size={32} />
                  </div>
                  <h4 className="font-semibold mb-2">Drag & Drop {title.toLowerCase()} here</h4>
                  <p className="text-sm text-foreground/60 mb-4">or click to browse</p>
                  <div className="flex gap-2 justify-center text-xs text-foreground/50">
                    <span>Supports PDF</span>
                    <span>•</span>
                    <span>DOCX</span>
                    <span>•</span>
                    <span>TXT</span>
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          // Paste Tab
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full min-h-64 p-4 bg-card border-2 border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-mono text-sm"
          />
        )}
      </motion.div>
    </motion.div>
  )
}
