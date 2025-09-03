// Vercel 배포시에도 안전한 환경 변수 접근
export const MOCK_MODE = import.meta.env?.VITE_MOCK_MODE === 'true' || 
  process.env.NODE_ENV === 'development' || 
  true // 기본값으로 Mock 모드 활성화

export const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || '/api/v1'

if (typeof window !== 'undefined') {
  console.log('Environment:', { MOCK_MODE, API_BASE_URL })
}