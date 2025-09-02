export interface DrcMainUser {
  drcNo: string
  basicDate: string
  comRegno: string
  comName: string
  comType: string
  memName: string
  receivableBalance: number
  statusCode: string
  transferStatus: string
  regDate: string
  confirmYn: string
}

export interface DrcMainUserExcel {
  drcNo: string
  basicDate: string
  comRegno: string
  comName: string
  comType: string
  memName: string
  receivableBalance: number
  statusCode: string
  transferStatus: string
  regDate: string
  confirmYn: string
}

export interface DrcMainSearchParams {
  startDate?: string
  endDate?: string
  companyType?: string
  statusCode?: string
  keyword?: string
}

export interface DrcMainCreateRequest {
  basicDate: string
  comRegno: string
  comName: string
  comType: string
  memName: string
  receivableBalance: number
  statusCode?: string
}

export interface PagedResponse<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  numberOfElements: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  timestamp: string
}
