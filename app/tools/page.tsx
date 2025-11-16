import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckSquare, FileText, ArrowRight } from 'lucide-react'

export default function ToolsPage() {
  const tools = [
    {
      icon: CheckSquare,
      title: 'Todo Manager',
      description: 'Dynamic Island style todo list with beautiful animations',
      href: '/tools/todo',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FileText,
      title: 'Markdown Editor',
      description: 'Live preview markdown editor with syntax highlighting',
      href: '/tools/markdown',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Tools</h1>
        <p className="text-muted-foreground text-lg">
          Powerful productivity tools built with AI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <Card
            key={tool.title}
            className="group hover:scale-105 transition-all animate-fade-in overflow-hidden"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            <CardHeader className="relative">
              <div className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <tool.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">{tool.title}</CardTitle>
              <CardDescription className="text-base">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent className="relative">
              <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Link href={tool.href}>
                  Open Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
