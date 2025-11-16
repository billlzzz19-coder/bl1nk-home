import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-9xl font-bold gradient-text">404</h1>
        <h2 className="text-3xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground text-lg max-w-md">
          ขอ��ภัย ไม่พบหน้าที่คุณกำลังมองหา
        </p>

        <div className="flex gap-4 justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              กลับหน้าแรก
            </Link>
          </Button>
          <Button size="lg" variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-5 w-5" />
            ย้อนกลับ
          </Button>
        </div>
      </div>
    </div>
  )
}
