import { apiClient } from './api'
import { MOCK_MODE } from '@/config/environment'
import { mockDrcService } from '@/mocks'
import type { 
  DrcMainUser, 
  DrcMainSearchParams, 
  PagedResponse,
  DrcMainCreateRequest 
} from '@/types/drc'

export const drcService = {
  getDrcMainUserList: (
    params: DrcMainSearchParams, 
    page: number = 0, 
    size: number = 20
  ): Promise<PagedResponse<DrcMainUser>> => {
    if (MOCK_MODE) {
      return mockDrcService.getDrcMainUserList(params, page, size)
    }
    return apiClient.get('/drc/main/users', {
      params: { ...params, page, size }
    })
  },
  
  downloadDrcMainUserListExcel: (params: DrcMainSearchParams): Promise<Blob> => {
    if (MOCK_MODE) {
      return mockDrcService.downloadDrcMainUserListExcel(params)
    }
    return apiClient.get('/drc/main/users/excel', {
      params,
      responseType: 'blob'
    })
  },
  
  createDrcMain: (data: DrcMainCreateRequest) => {
    if (MOCK_MODE) {
      return mockDrcService.createDrcMain(data)
    }
    return apiClient.post('/drc/main', data)
  },
  
  updateDrcMain: (drcNo: string, data: DrcMainCreateRequest) => {
    if (MOCK_MODE) {
      return mockDrcService.updateDrcMain(drcNo, data)
    }
    return apiClient.put(`/drc/main/${drcNo}`, data)
  },
  
  deleteDrcMain: (drcNo: string) => {
    if (MOCK_MODE) {
      return mockDrcService.deleteDrcMain(drcNo)
    }
    return apiClient.delete(`/drc/main/${drcNo}`)
  },
  
  getDrcMainByNo: (drcNo: string) => {
    if (MOCK_MODE) {
      return mockDrcService.getDrcMainByNo(drcNo)
    }
    return apiClient.get(`/drc/main/${drcNo}`)
  }
}
