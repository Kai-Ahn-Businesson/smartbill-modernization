import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { drcService } from '@/services/drcService'
import type { DrcMainSearchParams, DrcMainCreateRequest } from '@/types/drc'

export const useDrcMainUserList = (
  params: DrcMainSearchParams,
  page: number = 0,
  size: number = 20
) => {
  return useQuery({
    queryKey: ['drcMainUserList', params, page, size],
    queryFn: () => drcService.getDrcMainUserList(params, page, size),
    staleTime: 5 * 60 * 1000, // 5분
  })
}

export const useCreateDrcMain = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: drcService.createDrcMain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drcMainUserList'] })
    }
  })
}

export const useUpdateDrcMain = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ drcNo, data }: { drcNo: string; data: DrcMainCreateRequest }) =>
      drcService.updateDrcMain(drcNo, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drcMainUserList'] })
    }
  })
}

export const useDeleteDrcMain = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: drcService.deleteDrcMain,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['drcMainUserList'] })
    }
  })
}

export const useDrcMainByNo = (drcNo: string) => {
  return useQuery({
    queryKey: ['drcMain', drcNo],
    queryFn: () => drcService.getDrcMainByNo(drcNo),
    enabled: !!drcNo,
    staleTime: 10 * 60 * 1000, // 10분
  })
}

export const useDownloadDrcMainExcel = () => {
  return useMutation({
    mutationFn: drcService.downloadDrcMainUserListExcel,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `drc_main_users_${new Date().getTime()}.xlsx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }
  })
}
