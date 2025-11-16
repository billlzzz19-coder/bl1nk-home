"use client"

import { useState, useEffect } from 'react'
import { marked } from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'

const defaultMarkdown = `# Markdown Editor with Syntax Highlighting

Welcome to the **BLinkOS Markdown Editor**! This editor supports full markdown syntax with beautiful code highlighting.

## Features

- ✨ Live Preview
- 🎨 Syntax Highlighting
- 📝 Full Markdown Support
- 💾 Auto-save (coming soon)

## Code Example

\`\`\`typescript
interface User {
  id: number
  name: string
  email: string
}

const greetUser = (user: User): string => {
  return \`Hello, \${user.name}!\`
}

const user: User = { id: 1, name: "Developer", email: "dev@blinkos.com" }
console.log(greetUser(user))
\`\`\`

## Python Example

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence"""
    a, b = 0, 1
    while a < n:
        yield a
        a, b = b, a + b

for num in fibonacci(100):
    print(num)
\`\`\`

## Lists

### Ordered List
1. First item
2. Second item
3. Third item

### Unordered List
- React
- Next.js
- TypeScript
- Tailwind CSS

## Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay

## Table

| Feature | Status | Priority |
|---------|--------|----------|
| Live Preview | ✅ Done | High |
| Export | 🚧 In Progress | Medium |
| Collaboration | 📋 Planned | Low |

---

**Happy writing!** 🚀
`

export default function MarkdownEditorPage() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [html, setHtml] = useState('')
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit')

  useEffect(() => {
    const processMarkdown = async () => {
      const result = await marked(markdown)
      setHtml(result as string)
    }
    processMarkdown()
  }, [markdown])

  useEffect(() => {
    if (activeTab === 'preview') {
      setTimeout(() => {
        Prism.highlightAll()
      }, 0)
    }
  }, [html, activeTab])

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 gradient-text">Markdown Editor</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Write in markdown, see the result in real-time
          </p>
        </div>

        {/* Tabs for mobile */}
        <div className="flex mb-4 border-b border-gray-200 dark:border-gray-700 md:hidden">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'edit'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('edit')}
          >
            Edit
          </button>
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'preview'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('preview')}
          >
            Preview
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Editor */}
          <div className={activeTab === 'edit' ? 'block' : 'hidden md:block'}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Editor</span>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-[600px] p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none resize-none"
                placeholder="Write your markdown here..."
              />
            </div>
          </div>

          {/* Preview */}
          <div className={activeTab === 'preview' ? 'block' : 'hidden md:block'}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Preview</span>
              </div>
              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none p-4 h-[600px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
