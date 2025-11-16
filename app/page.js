"use client"

import { useState } from "react"
import MarkdownEditor from "@/components/markdown-editor"
import MarkdownPreview from "@/components/markdown-preview"

export default function Home() {
  const [markdown, setMarkdown] = useState(`# Markdown Editor with Syntax Highlighting

Start typing to see the preview...

## Code Example

\`\`\`jsx
"use client";

import Image from "next/image";
import { BadgeCheck, DollarSign, Clock } from 'lucide-react';

const CourseCard = ({ course }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300">
      {/* Course Poster */}
      <div className="relative">
        <Image
          src={course.posterURL || "/placeholder.svg"}
          alt={course.courseTitle}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <span className="absolute top-3 left-3 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {course.level}
        </span>
      </div>

      {/* Course Details */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">{course.courseTitle}</h2>
        <p className="text-gray-600 mt-2">{course.shortDescription}</p>

        {/* Instructor Info */}
        <div className="flex items-center gap-3 mt-4">
          <Image
            src={course.instructurePhotoURL || "/placeholder.svg"}
            alt={course.instructureName}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <p className="text-gray-700 font-medium">{course.instructureName}</p>
        </div>

        {/* Course Metadata */}
        <div className="flex flex-wrap justify-between items-center mt-5">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={20} className="text-purple-500" />
            <span className="text-sm">{new Date(course.createdAt.seconds * 1000).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <BadgeCheck size={20} className="text-purple-500" />
            <span className="text-sm">{course.category}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <DollarSign size={20} className="text-purple-500" />
            <span className="text-sm font-semibold">\${course.coursePrice}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-purple-500 hover:bg-purple-400 text-white font-semibold py-2 rounded-lg transition">
            Enroll Now
          </button>
          <button className="flex-1 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white py-2 rounded-lg transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
\`\`\`

## Python Example

\`\`\`python
def fibonacci(n):
    """Generate the Fibonacci sequence up to n"""
    a, b = 0, 1
    while a < n:
        yield a
        a, b = b, a + b

# Print the Fibonacci sequence up to 1000
for num in fibonacci(1000):
    print(num)
\`\`\`
`)
  const [activeTab, setActiveTab] = useState("edit") // 'edit' or 'preview'

  const handleMarkdownChange = (newMarkdown) => {
    setMarkdown(newMarkdown)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">Markdown Editor</h1>

        {/* Tabs for mobile view */}
        <div className="flex mb-4 border-b border-gray-200 md:hidden">
          <button
            className={`px-4 py-2 ${activeTab === "edit" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "preview" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-600 dark:text-gray-300"}`}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Editor */}
          <div className={`w-full md:w-1/2 ${activeTab === "edit" ? "block" : "hidden md:block"}`}>
            <MarkdownEditor markdown={markdown} onChange={handleMarkdownChange} />
          </div>

          {/* Preview */}
          <div className={`w-full md:w-1/2 ${activeTab === "preview" ? "block" : "hidden md:block"}`}>
            <MarkdownPreview markdown={markdown} />
          </div>
        </div>
      </div>
    </div>
  )
}
