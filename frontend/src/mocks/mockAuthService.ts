import type { LoginRequest, LoginResponse, User } from '@/services/authService'

// Mock JWT 토큰 생성 (실제로는 서버에서 생성)
const generateMockJWT = (userId: string): string => {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24시간 후 만료
    role: 'ADMIN'
  }
  
  const base64Header = btoa(JSON.stringify(header))
  const base64Payload = btoa(JSON.stringify(payload))
  const signature = 'mock_signature_' + Math.random().toString(36).substr(2, 9)
  
  return `${base64Header}.${base64Payload}.${signature}`
}

class MockAuthService {
  // Mock 로그인 - 어떤 ID/PW든 성공
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // 실제 API 호출을 시뮬레이션하기 위한 딜레이
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // 아무 ID나 입력하면 로그인 성공
    if (credentials.username.trim() && credentials.password.trim()) {
      const mockUser: User = {
        adminId: credentials.username,
        adminName: credentials.username === 'admin' ? '시스템 관리자' : `${credentials.username} 사용자`,
        adminTeam: credentials.username === 'admin' ? '시스템팀' : '일반사용자팀',
        levelCode: credentials.username === 'admin' ? 'SUPER_ADMIN' : 'ADMIN',
        adminNo: Math.floor(Math.random() * 1000) + 1,
        pwChangeDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30일 전
        sha256YN: 'Y',
        failCount: 0,
        lastLoginAt: new Date().toISOString()
      }
      
      const token = generateMockJWT(credentials.username)
      
      return {
        success: true,
        message: '로그인이 성공하였습니다.',
        user: mockUser,
        token: token,
        locked: false
      }
    }
    
    // 빈 값이 입력된 경우만 실패
    return {
      success: false,
      message: 'ID와 비밀번호를 입력해주세요.',
      locked: false
    }
  }
  
  // Mock 로그아웃
  async logout(): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    this.clearTokens()
    return true
  }
  
  // 토큰 저장
  saveToken(token: string): void {
    localStorage.setItem('accessToken', token)
  }
  
  // 사용자 정보 저장
  saveUser(user: User): void {
    localStorage.setItem('userInfo', JSON.stringify(user))
  }
  
  // 토큰 조회
  getToken(): string | null {
    return localStorage.getItem('accessToken')
  }
  
  // 사용자 정보 조회
  getUser(): User | null {
    try {
      const userInfo = localStorage.getItem('userInfo')
      return userInfo ? JSON.parse(userInfo) : null
    } catch (error) {
      console.error('Error parsing user info:', error)
      return null
    }
  }
  
  // 인증 상태 확인 (Mock에서는 토큰만 있으면 유효)
  isAuthenticated(): boolean {
    const token = this.getToken()
    return !!token
  }
  
  // 토큰과 사용자 정보 삭제
  clearTokens(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userInfo')
  }
  
  // API 요청을 위한 헤더 생성
  getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    return token ? { 'Authorization': `Bearer ${token}` } : {}
  }
}

export const mockAuthService = new MockAuthService()

// 인증된 fetch wrapper (Mock 버전)
export async function mockAuthenticatedFetch(
  _url: string, 
  _options: RequestInit = {}
): Promise<Response> {
  // Mock에서는 실제 fetch 대신 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 300))
  
  // 401 시뮬레이션 (토큰이 없는 경우)
  if (!mockAuthService.getToken()) {
    mockAuthService.clearTokens()
    window.location.href = '/login'
    throw new Error('Unauthorized')
  }
  
  // Mock 응답 반환
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}