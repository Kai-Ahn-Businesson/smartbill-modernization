import { MOCK_MODE } from '@/config/environment'
import { mockAuthService, mockAuthenticatedFetch } from '@/mocks'

// TODO: 향후 환경변수로 API URL 관리 필요
const API_BASE_URL = '/api'

export interface LoginRequest {
  username: string
  password: string
}

export interface User {
  adminId: string
  adminName: string
  adminTeam: string
  levelCode: string
  adminNo: number
  pwChangeDate?: string
  sha256YN: string
  failCount: number
  lastLoginAt?: string
}

export interface LoginResponse {
  success: boolean
  message?: string
  user?: User
  token?: string
  locked?: boolean
}

class AuthService {
  private baseUrl = `${API_BASE_URL}/auth`
  
  // 로그인 API 호출
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Mock 모드인 경우 Mock 서비스 사용
    if (MOCK_MODE) {
      return mockAuthService.login(credentials)
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Login error:', error)
      throw new Error('로그인 요청 중 오류가 발생했습니다.')
    }
  }
  
  // TODO: 향후 로그아웃 API 구현 시 활성화
  async logout(): Promise<boolean> {
    // Mock 모드인 경우 Mock 서비스 사용
    if (MOCK_MODE) {
      return mockAuthService.logout()
    }
    
    try {
      // const response = await fetch(`${this.baseUrl}/logout`, {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${this.getToken()}`
      //   }
      // })
      
      // JWT는 stateless이므로 클라이언트에서만 토큰 삭제
      this.clearTokens()
      return true
    } catch (error) {
      console.error('Logout error:', error)
      // 오류가 발생해도 클라이언트 토큰은 삭제
      this.clearTokens()
      return false
    }
  }
  
  // 토큰 저장 (레거시 쿠키 대신 localStorage 사용)
  saveToken(token: string): void {
    if (MOCK_MODE) {
      mockAuthService.saveToken(token)
      return
    }
    localStorage.setItem('accessToken', token)
  }
  
  // 사용자 정보 저장
  saveUser(user: User): void {
    if (MOCK_MODE) {
      mockAuthService.saveUser(user)
      return
    }
    localStorage.setItem('userInfo', JSON.stringify(user))
  }
  
  // 토큰 조회
  getToken(): string | null {
    if (MOCK_MODE) {
      return mockAuthService.getToken()
    }
    return localStorage.getItem('accessToken')
  }
  
  // 사용자 정보 조회
  getUser(): User | null {
    if (MOCK_MODE) {
      return mockAuthService.getUser()
    }
    try {
      const userInfo = localStorage.getItem('userInfo')
      return userInfo ? JSON.parse(userInfo) : null
    } catch (error) {
      console.error('Error parsing user info:', error)
      return null
    }
  }
  
  // 인증 상태 확인
  isAuthenticated(): boolean {
    if (MOCK_MODE) {
      return mockAuthService.isAuthenticated()
    }
    
    const token = this.getToken()
    if (!token) return false
    
    // TODO: JWT 토큰 만료 확인 로직 추가 필요
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch (error) {
      console.error('Token validation error:', error)
      return false
    }
  }
  
  // 토큰과 사용자 정보 삭제
  clearTokens(): void {
    if (MOCK_MODE) {
      mockAuthService.clearTokens()
      return
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
  }
  
  // API 요청을 위한 헤더 생성
  getAuthHeaders(): Record<string, string> {
    if (MOCK_MODE) {
      return mockAuthService.getAuthHeaders()
    }
    const token = this.getToken()
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }
}

// 싱글톤 인스턴스 생성
export const authService = new AuthService()

// API 요청을 위한 fetch wrapper
export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  // Mock 모드인 경우 Mock fetch 사용
  if (MOCK_MODE) {
    return mockAuthenticatedFetch(url, options)
  }
  
  const headers = {
    'Content-Type': 'application/json',
    ...authService.getAuthHeaders(),
    ...options.headers
  }
  
  const response = await fetch(url, {
    ...options,
    headers
  })
  
  // 401 Unauthorized 시 자동 로그아웃
  if (response.status === 401) {
    authService.clearTokens()
    window.location.href = '/login'
  }
  
  return response
}