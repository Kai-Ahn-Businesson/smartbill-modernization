import { AxiosRequestConfig } from 'axios'

// Mock 응답 지연 시간 (실제 API 호출을 시뮬레이션)
const MOCK_DELAY = {
  fast: 200,
  normal: 500,
  slow: 1000
}

class MockApiClient {
  private baseURL: string = '/api/v1'
  
  constructor(baseURL: string = '/api/v1') {
    this.baseURL = baseURL
    console.log('MockApiClient initialized with baseURL:', baseURL)
  }
  
  // Mock 지연 시뮬레이션
  private async simulateNetworkDelay(delay: keyof typeof MOCK_DELAY = 'normal') {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY[delay]))
  }
  
  // Mock 인증 확인
  private checkAuth(): boolean {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      // 401 시뮬레이션
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
      return false
    }
    return true
  }
  
  async get<T>(url: string, _config?: AxiosRequestConfig): Promise<T> {
    console.log(`Mock GET: ${this.baseURL}${url}`)
    
    if (!this.checkAuth()) {
      throw new Error('Unauthorized')
    }
    
    await this.simulateNetworkDelay('fast')
    
    // Mock에서는 실제 HTTP 호출 없이 성공 응답
    return { success: true, message: 'Mock GET response' } as T
  }
  
  async post<T>(url: string, data?: any, _config?: AxiosRequestConfig): Promise<T> {
    console.log(`Mock POST: ${this.baseURL}${url}`, data)
    
    if (!this.checkAuth()) {
      throw new Error('Unauthorized')
    }
    
    await this.simulateNetworkDelay('normal')
    
    // Mock에서는 실제 HTTP 호출 없이 성공 응답
    return { success: true, message: 'Mock POST response', data } as T
  }
  
  async put<T>(url: string, data?: any, _config?: AxiosRequestConfig): Promise<T> {
    console.log(`Mock PUT: ${this.baseURL}${url}`, data)
    
    if (!this.checkAuth()) {
      throw new Error('Unauthorized')
    }
    
    await this.simulateNetworkDelay('normal')
    
    // Mock에서는 실제 HTTP 호출 없이 성공 응답
    return { success: true, message: 'Mock PUT response', data } as T
  }
  
  async delete<T>(url: string, _config?: AxiosRequestConfig): Promise<T> {
    console.log(`Mock DELETE: ${this.baseURL}${url}`)
    
    if (!this.checkAuth()) {
      throw new Error('Unauthorized')
    }
    
    await this.simulateNetworkDelay('fast')
    
    // Mock에서는 실제 HTTP 호출 없이 성공 응답
    return { success: true, message: 'Mock DELETE response' } as T
  }
}

export const mockApiClient = new MockApiClient()