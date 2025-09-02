import { useState } from 'react'
import { DrcSearchForm } from '@/components/feature/drc/DrcSearchForm'
import { DrcUserTable } from '@/components/feature/drc/DrcUserTable'
import { useDrcMainUserList, useDownloadDrcMainExcel } from '@/hooks/queries/drcQueries'
import type { DrcMainSearchParams } from '@/types/drc'

export function DrcMainPage() {
  const [searchParams, setSearchParams] = useState<DrcMainSearchParams>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30일 전
    endDate: new Date().toISOString().split('T')[0],
    companyType: '',
    statusCode: '',
    keyword: ''
  })
  const [currentPage, setCurrentPage] = useState(0)
  
  const { 
    data: userListData, 
    isLoading, 
    error 
  } = useDrcMainUserList(searchParams, currentPage)
  
  const downloadExcel = useDownloadDrcMainExcel()
  
  const handleSearch = (params: DrcMainSearchParams) => {
    setSearchParams(params)
    setCurrentPage(0)
  }
  
  const handleExcelDownload = () => {
    downloadExcel.mutate(searchParams)
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              오류가 발생했습니다
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {error.message}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">DRC 메인 관리</h1>
        
        <DrcSearchForm 
          initialParams={searchParams}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            검색 결과 ({userListData?.totalElements ?? 0}건)
          </h2>
          
          <button
            onClick={handleExcelDownload}
            disabled={downloadExcel.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {downloadExcel.isPending ? '다운로드 중...' : '엑셀 다운로드'}
          </button>
        </div>
        
        <DrcUserTable
          data={userListData?.content ?? []}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={userListData?.totalPages ?? 0}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
