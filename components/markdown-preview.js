"use client"

import { useEffect, useState } from "react"
import { marked } from "marked"
import Prism from "prismjs"

// Import Prism language components
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-php"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-swift"

export default function MarkdownPreview({ markdown }) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // Configure marked with syntax highlighting
    marked.setOptions({
      highlight: (code, lang) => {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang)
        } else {
          return code
        }
      },
      breaks: true,
      gfm: true,
    })

    // Convert markdown to HTML
    try {
      const rawHtml = marked.parse(markdown || "")
      setHtml(rawHtml)

      // Apply Prism highlighting to any code that might have been missed
      setTimeout(() => {
        Prism.highlightAll()
      }, 0)
    } catch (error) {
      console.error("Error parsing markdown:", error)
      setHtml("<p>Error rendering preview</p>")
    }
  }, [markdown])

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      <div className="p-2 border-b bg-gray-50 dark:bg-gray-700">
        <h3 className="font-medium text-gray-700 dark:text-gray-200">Preview</h3>
      </div>
      <div
        className="markdown-preview p-4 prose dark:prose-invert max-w-none h-[500px] overflow-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
