import type { DrcMainUser } from '@/types/drc'

// 가짜 DRC 데이터 생성
export const generateMockDrcData = (count: number = 30): DrcMainUser[] => {
  const companyTypes = ['법인', '개인사업자', '비영리법인', '조합']
  const statusCodes = ['정상', '지연', '완료', '보류']
  const transferStatuses = ['전송완료', '전송대기', '전송실패']
  const confirmOptions = ['Y', 'N']
  
  const companyNames = [
    '테크솔루션', '디지털시스템', '스마트웍스', '이노베이션IT', '크리에이트랩',
    '퓨처테크', '글로벌소프트', '뉴웨이브IT', '다이나믹시스템', '아이디어팩토리',
    '넥스트젠', '엑셀런스IT', '프리미엄솔루션', '옵티마이즈', '인텔리전트웍스',
    '프로그레시브IT', '유니버셜시스템', '어드밴스드테크', '모던솔루션', '하이테크랩',
    '이지테크', '스마트솔루션', '퍼펙트시스템', '얼티메이트IT', '엑스트라테크'
  ]
  
  const memberNames = [
    '김철수', '이영희', '박민수', '정수진', '최성호',
    '한미영', '강지훈', '윤서연', '임동혁', '송은정',
    '조현우', '배소영', '황민석', '신지은', '오태호',
    '권미래', '서준호', '홍지영', '노상훈', '문예린'
  ]

  return Array.from({ length: count }, (_, index) => {
    const basicDate = new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    const regDate = new Date(basicDate.getTime() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
    
    return {
      drcNo: `DRC${String(index + 1).padStart(6, '0')}`,
      basicDate: basicDate.toISOString().split('T')[0],
      comRegno: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900000) + 100000}`,
      comName: `${companyNames[Math.floor(Math.random() * companyNames.length)]}`,
      comType: companyTypes[Math.floor(Math.random() * companyTypes.length)],
      memName: memberNames[Math.floor(Math.random() * memberNames.length)],
      receivableBalance: Math.floor(Math.random() * 10000000) + 100000,
      statusCode: statusCodes[Math.floor(Math.random() * statusCodes.length)],
      transferStatus: transferStatuses[Math.floor(Math.random() * transferStatuses.length)],
      regDate: regDate.toISOString().split('T')[0],
      confirmYn: confirmOptions[Math.floor(Math.random() * confirmOptions.length)]
    }
  })
}

// 대시보드 통계 데이터
export const mockDashboardStats = {
  totalCompanies: 156,
  activeUsers: 89,
  pendingApprovals: 12,
  monthlyRevenue: 45600000,
  dailyTransactions: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 50) + 10
  })),
  statusDistribution: [
    { status: '정상', count: 120, color: '#22c55e' },
    { status: '지연', count: 25, color: '#f59e0b' },
    { status: '보류', count: 8, color: '#ef4444' },
    { status: '완료', count: 3, color: '#3b82f6' }
  ]
}

// 회사 목록 데이터
export const mockCompanies = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `테크솔루션${index + 1}`,
  regNo: `${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 900000) + 100000}`,
  type: ['법인', '개인사업자', '비영리법인'][Math.floor(Math.random() * 3)],
  status: ['활성', '비활성', '보류'][Math.floor(Math.random() * 3)],
  registDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  lastLoginAt: Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString() : null
}))

// 사용자 목록 데이터
export const mockUsers = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  adminId: `admin${index + 1}`,
  adminName: ['김철수', '이영희', '박민수', '정수진', '최성호', '한미영'][Math.floor(Math.random() * 6)],
  adminTeam: ['개발팀', '영업팀', '관리팀', '마케팅팀'][Math.floor(Math.random() * 4)],
  levelCode: ['ADMIN', 'USER', 'VIEWER'][Math.floor(Math.random() * 3)],
  status: ['활성', '비활성'][Math.floor(Math.random() * 2)],
  lastLoginAt: Math.random() > 0.2 ? new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString() : null,
  createdAt: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString()
}))

// 스케줄 데이터
export const mockSchedules = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  title: [`정기 점검 스케줄`, `시스템 업데이트`, `회의 일정`, `교육 프로그램`][Math.floor(Math.random() * 4)],
  description: `스케줄 ${index + 1}에 대한 상세 설명입니다.`,
  startDate: new Date(Date.now() + Math.floor(Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date(Date.now() + Math.floor(Math.random() * 60 + 1) * 24 * 60 * 60 * 1000).toISOString(),
  priority: ['높음', '보통', '낮음'][Math.floor(Math.random() * 3)],
  status: ['예정', '진행중', '완료', '취소'][Math.floor(Math.random() * 4)],
  assignedTo: ['김철수', '이영희', '박민수', '정수진'][Math.floor(Math.random() * 4)]
}))

// 리포트 데이터  
export const mockReports = Array.from({ length: 15 }, (_, index) => ({
  id: index + 1,
  title: [`월간 매출 리포트`, `사용자 활동 분석`, `시스템 성능 리포트`, `보안 감사 리포트`][Math.floor(Math.random() * 4)],
  type: ['매출', '활동', '시스템', '보안'][Math.floor(Math.random() * 4)],
  period: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}`,
  status: ['생성완료', '생성중', '오류', '대기중'][Math.floor(Math.random() * 4)],
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
  fileSize: `${(Math.random() * 10 + 0.1).toFixed(1)}MB`,
  downloadCount: Math.floor(Math.random() * 100)
}))

// 메일 데이터
export const mockMails = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  subject: [`시스템 알림: 정기 점검 예정`, `월간 리포트가 준비되었습니다`, `새로운 사용자 등록 승인 요청`, `계정 보안 업데이트`][Math.floor(Math.random() * 4)],
  from: ['system@smartbill.com', 'admin@smartbill.com', 'support@smartbill.com'][Math.floor(Math.random() * 3)],
  to: 'user@example.com',
  status: ['읽음', '읽지않음', '중요'][Math.floor(Math.random() * 3)],
  sentAt: new Date(Date.now() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000).toISOString(),
  body: `메일 ${index + 1}의 본문 내용입니다. 상세한 내용은 별도 첨부파일을 참고해 주세요.`,
  hasAttachment: Math.random() > 0.7
}))

// 시스템 설정 데이터
export const mockSettings = {
  system: {
    appName: 'SmartBill',
    version: '2.1.0',
    environment: 'Production',
    maintenanceMode: false,
    backupEnabled: true,
    lastBackup: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  security: {
    passwordPolicy: '8자리 이상, 영문+숫자+특수문자',
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorAuth: false
  },
  notification: {
    emailEnabled: true,
    smsEnabled: false,
    pushEnabled: true,
    errorAlerts: true
  }
}

// 메모리에서 관리할 가변 데이터
export let mutableMockDrcData = generateMockDrcData()

// DRC 데이터 조작 함수들
export const mockDrcOperations = {
  getAll: () => mutableMockDrcData,
  getById: (drcNo: string) => mutableMockDrcData.find(item => item.drcNo === drcNo),
  add: (data: Omit<DrcMainUser, 'drcNo' | 'regDate'>) => {
    const newItem: DrcMainUser = {
      ...data,
      drcNo: `DRC${String(mutableMockDrcData.length + 1).padStart(6, '0')}`,
      regDate: new Date().toISOString().split('T')[0]
    }
    mutableMockDrcData.unshift(newItem)
    return newItem
  },
  update: (drcNo: string, data: Partial<DrcMainUser>) => {
    const index = mutableMockDrcData.findIndex(item => item.drcNo === drcNo)
    if (index !== -1) {
      mutableMockDrcData[index] = { ...mutableMockDrcData[index], ...data }
      return mutableMockDrcData[index]
    }
    return null
  },
  delete: (drcNo: string) => {
    const index = mutableMockDrcData.findIndex(item => item.drcNo === drcNo)
    if (index !== -1) {
      return mutableMockDrcData.splice(index, 1)[0]
    }
    return null
  },
  search: (params: {
    startDate?: string
    endDate?: string
    companyType?: string
    statusCode?: string
    keyword?: string
  }) => {
    return mutableMockDrcData.filter(item => {
      if (params.startDate && item.basicDate < params.startDate) return false
      if (params.endDate && item.basicDate > params.endDate) return false
      if (params.companyType && item.comType !== params.companyType) return false
      if (params.statusCode && item.statusCode !== params.statusCode) return false
      if (params.keyword) {
        const keyword = params.keyword.toLowerCase()
        return item.comName.toLowerCase().includes(keyword) || 
               item.memName.toLowerCase().includes(keyword) ||
               item.drcNo.toLowerCase().includes(keyword)
      }
      return true
    })
  }
}