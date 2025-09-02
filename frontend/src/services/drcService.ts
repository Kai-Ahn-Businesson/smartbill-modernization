import { apiClient } from './api'
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
    return apiClient.get('/drc/main/users', {
      params: { ...params, page, size }
    })
  },
  
  downloadDrcMainUserListExcel: (params: DrcMainSearchParams): Promise<Blob> => {
    return apiClient.get('/drc/main/users/excel', {
      params,
      responseType: 'blob'
    })
  },
  
  createDrcMain: (data: DrcMainCreateRequest) => {
    return apiClient.post('/drc/main', data)
  },
  
  updateDrcMain: (drcNo: string, data: DrcMainCreateRequest) => {
    return apiClient.put(`/drc/main/${drcNo}`, data)
  },
  
  deleteDrcMain: (drcNo: string) => {
    return apiClient.delete(`/drc/main/${drcNo}`)
  },
  
  getDrcMainByNo: (drcNo: string) => {
    return apiClient.get(`/drc/main/${drcNo}`)
  }
}
