import { useState, useEffect } from 'react'
import { authService, User, LoginRequest, LoginResponse } from '@/services/authService'

interface UseAuthReturn {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginRequest) => Promise<LoginResponse>
  logout: () => Promise<void>
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  // 초기 로드 시 저장된 사용자 정보 확인
  useEffect(() => {
    const initAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const savedUser = authService.getUser()
          setUser(savedUser)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        authService.clearTokens()
      } finally {
        setIsLoading(false)
      }
    }
    
    initAuth()
  }, [])
  
  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await authService.login(credentials)
      
      if (response.success && response.user && response.token) {
        // 토큰과 사용자 정보 저장
        authService.saveToken(response.token)
        authService.saveUser(response.user)
        setUser(response.user)
      }
      
      return response
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }
  
  const logout = async (): Promise<void> => {
    try {
      await authService.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
      // 오류가 발생해도 클라이언트 상태는 초기화
      setUser(null)
    }
  }
  
  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  }
}

// TODO: 향후 Context API로 전역 상태 관리 고려
// 현재는 각 컴포넌트에서 개별적으로 useAuth 훅 사용