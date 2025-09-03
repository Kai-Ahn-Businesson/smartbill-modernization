import type { 
  DrcMainUser, 
  DrcMainSearchParams, 
  PagedResponse,
  DrcMainCreateRequest 
} from '@/types/drc'
import { mockDrcOperations } from './mockData'

// Mock 지연 시뮬레이션
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const mockDrcService = {
  // DRC 메인 사용자 목록 조회
  getDrcMainUserList: async (
    params: DrcMainSearchParams, 
    page: number = 0, 
    size: number = 20
  ): Promise<PagedResponse<DrcMainUser>> => {
    console.log('Mock getDrcMainUserList called with:', { params, page, size })
    await delay(600) // API 호출 시뮬레이션
    
    // 검색 조건에 따른 필터링
    let filteredData = mockDrcOperations.search(params)
    
    // 정렬 (최신 등록일순)
    filteredData = filteredData.sort((a, b) => 
      new Date(b.regDate).getTime() - new Date(a.regDate).getTime()
    )
    
    // 페이지네이션
    const totalElements = filteredData.length
    const totalPages = Math.ceil(totalElements / size)
    const startIndex = page * size
    const endIndex = startIndex + size
    const content = filteredData.slice(startIndex, endIndex)
    
    return {
      content,
      totalElements,
      totalPages,
      size,
      number: page,
      first: page === 0,
      last: page >= totalPages - 1,
      numberOfElements: content.length
    }
  },
  
  // Excel 다운로드 (Mock Blob 반환)
  downloadDrcMainUserListExcel: async (params: DrcMainSearchParams): Promise<Blob> => {
    console.log('Mock downloadDrcMainUserListExcel called with:', params)
    await delay(1000) // 파일 생성 시뮬레이션
    
    // 검색된 데이터를 CSV 형태로 변환
    const filteredData = mockDrcOperations.search(params)
    const csvHeader = 'DRC번호,기준일자,사업자등록번호,회사명,회사유형,담당자명,채권잔액,상태코드,전송상태,등록일자,확인여부\n'
    const csvData = filteredData.map(item => 
      `${item.drcNo},${item.basicDate},${item.comRegno},${item.comName},${item.comType},${item.memName},${item.receivableBalance},${item.statusCode},${item.transferStatus},${item.regDate},${item.confirmYn}`
    ).join('\n')
    
    const csvContent = csvHeader + csvData
    
    return new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
  },
  
  // DRC 메인 생성
  createDrcMain: async (data: DrcMainCreateRequest): Promise<DrcMainUser> => {
    console.log('Mock createDrcMain called with:', data)
    await delay(800)
    
    const newItem = mockDrcOperations.add({
      ...data,
      statusCode: data.statusCode || '정상',
      transferStatus: '전송대기',
      confirmYn: 'N'
    })
    
    console.log('Mock DRC created:', newItem)
    return newItem
  },
  
  // DRC 메인 수정  
  updateDrcMain: async (drcNo: string, data: DrcMainCreateRequest): Promise<DrcMainUser> => {
    console.log('Mock updateDrcMain called with:', { drcNo, data })
    await delay(800)
    
    const updatedItem = mockDrcOperations.update(drcNo, data)
    if (!updatedItem) {
      throw new Error(`DRC ${drcNo}을(를) 찾을 수 없습니다.`)
    }
    
    console.log('Mock DRC updated:', updatedItem)
    return updatedItem
  },
  
  // DRC 메인 삭제
  deleteDrcMain: async (drcNo: string): Promise<{ success: boolean; message: string }> => {
    console.log('Mock deleteDrcMain called with:', drcNo)
    await delay(500)
    
    const deletedItem = mockDrcOperations.delete(drcNo)
    if (!deletedItem) {
      throw new Error(`DRC ${drcNo}을(를) 찾을 수 없습니다.`)
    }
    
    console.log('Mock DRC deleted:', deletedItem)
    return {
      success: true,
      message: `DRC ${drcNo}이(가) 성공적으로 삭제되었습니다.`
    }
  },
  
  // DRC 번호로 단건 조회
  getDrcMainByNo: async (drcNo: string): Promise<DrcMainUser> => {
    console.log('Mock getDrcMainByNo called with:', drcNo)
    await delay(400)
    
    const item = mockDrcOperations.getById(drcNo)
    if (!item) {
      throw new Error(`DRC ${drcNo}을(를) 찾을 수 없습니다.`)
    }
    
    console.log('Mock DRC found:', item)
    return item
  }
}