import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Edit, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { DrcMainUser } from '@/types/drc'

interface DrcUserTableProps {
  data: DrcMainUser[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DrcUserTable({ 
  data, 
  isLoading, 
  currentPage, 
  totalPages, 
  onPageChange 
}: DrcUserTableProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(data.map(item => item.drcNo)))
    } else {
      setSelectedItems(new Set())
    }
  }
  
  const handleSelectItem = (drcNo: string, checked: boolean) => {
    const newSelected = new Set(selectedItems)
    if (checked) {
      newSelected.add(drcNo)
    } else {
      newSelected.delete(drcNo)
    }
    setSelectedItems(newSelected)
  }
  
  const getStatusBadge = (statusCode: string) => {
    const statusMap = {
      'PENDING': { label: '대기', className: 'bg-yellow-100 text-yellow-800' },
      'PROCESSING': { label: '처리중', className: 'bg-blue-100 text-blue-800' },
      'COMPLETED': { label: '완료', className: 'bg-green-100 text-green-800' }
    }
    
    const status = statusMap[statusCode as keyof typeof statusMap] || { label: statusCode, className: 'bg-gray-100 text-gray-800' }
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${status.className}`}>
        {status.label}
      </span>
    )
  }
  
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">데이터를 불러오는 중...</p>
      </div>
    )
  }
  
  if (data.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      </div>
    )
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <input
                type="checkbox"
                checked={selectedItems.size === data.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              DRC 번호
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              기준일자
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              회사명
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              담당자
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              미수금액
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              등록일
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.drcNo} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item.drcNo)}
                  onChange={(e) => handleSelectItem(item.drcNo, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.drcNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(item.basicDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.comName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.memName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(item.receivableBalance)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(item.statusCode)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(item.regDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <Link to={`/drc/edit/${item.drcNo}`}>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/drc/view/${item.drcNo}`}>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              다음
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                <span className="font-medium">{(currentPage * 20) + 1}</span> ~{' '}
                <span className="font-medium">
                  {Math.min((currentPage + 1) * 20, data.length)}
                </span>{' '}
                / <span className="font-medium">{data.length}</span> 건
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(i)}
                    className="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    {i + 1}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
