import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-500 mb-8">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              대시보드로 이동
            </Link>
          </Button>
          
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            이전 페이지로
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-400">
          <p>문제가 지속되면 시스템 관리자에게 문의하세요.</p>
        </div>
      </div>
    </div>
  )
}
