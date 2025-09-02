import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [failCount, setFailCount] = useState(0)
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    
    try {
      const response = await login({
        username,
        password
      })
      
      if (response.success) {
        // 로그인 성공 시 메인 페이지로 리다이렉트
        navigate('/')
      } else {
        // 로그인 실패 처리 (레거시와 동일한 메시지)
        setError(response.message || '로그인에 실패했습니다.')
        
        if (response.locked) {
          // 5회 실패로 계정 잠금
          setFailCount(5)
        } else {
          // 실패 횟수 증가 (UI에서 경고 표시용)
          setFailCount(prev => Math.min(prev + 1, 4))
        }
      }
    } catch (err) {
      console.error('로그인 오류:', err)
      setError('로그인 처리 중 오류가 발생했습니다.')
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">SB</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            SmartBill 관리자 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            관리자 ID와 비밀번호를 입력하세요
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>관리자 로그인</CardTitle>
            <CardDescription>
              {failCount > 0 && failCount < 5 && (
                <span className="text-orange-600">
                  로그인 실패 {failCount}회. 5회 실패 시 계정이 잠깁니다.
                </span>
              )}
              {failCount >= 5 ? (
                <span className="text-red-600">계정이 잠겼습니다. 30분 후에 다시 시도하세요.</span>
              ) : (
                "관리자 ID와 비밀번호를 입력하세요"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm whitespace-pre-line">{error}</p>
              </div>
            )}
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  관리자 ID
                </label>
                <Input
                  id="username"
                  name="txtID"  // 레거시와 동일한 필드명
                  type="text"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="관리자 ID를 입력하세요"
                  disabled={failCount >= 5}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  비밀번호
                </label>
                <Input
                  id="password"
                  name="txtPW"  // 레거시와 동일한 필드명
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                  placeholder="비밀번호를 입력하세요"
                  disabled={failCount >= 5}
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || failCount >= 5}
              >
                {isLoading ? '로그인 중...' : failCount >= 5 ? '계정 잠금' : '로그인'}
              </Button>
            </form>
            
            {/* TODO: 향후 비밀번호 찾기, 계정 문의 기능 추가 */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                계정 문제가 있으시면 시스템 관리자에게 문의하세요.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
