import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUpdateDrcMain, useDrcMainByNo } from '@/hooks/queries/drcQueries'
import type { DrcMainCreateRequest, DrcMainUser } from '@/types/drc'

export function DrcEditPage() {
  const navigate = useNavigate()
  const { drcNo } = useParams<{ drcNo: string }>()
  const [formData, setFormData] = useState<DrcMainCreateRequest>({
    basicDate: '',
    comRegno: '',
    comName: '',
    comType: '',
    memName: '',
    receivableBalance: 0,
    statusCode: 'PENDING'
  })
  
  const { data: drcData, isLoading, error } = useDrcMainByNo(drcNo!)
  const updateDrcMain = useUpdateDrcMain()
  
  const isDrcMainUser = (data: any): data is DrcMainUser => {
    return data && typeof data === 'object' && 
           typeof data.basicDate === 'string' &&
           typeof data.comRegno === 'string' &&
           typeof data.comName === 'string' &&
           typeof data.comType === 'string' &&
           typeof data.memName === 'string' &&
           typeof data.receivableBalance === 'number' &&
           typeof data.statusCode === 'string'
  }

  useEffect(() => {
    if (isDrcMainUser(drcData)) {
      setFormData({
        basicDate: drcData.basicDate,
        comRegno: drcData.comRegno,
        comName: drcData.comName,
        comType: drcData.comType,
        memName: drcData.memName,
        receivableBalance: drcData.receivableBalance,
        statusCode: drcData.statusCode
      })
    }
  }, [drcData])
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!drcNo) return
    
    try {
      await updateDrcMain.mutateAsync({ drcNo, data: formData })
      navigate('/drc/main')
    } catch (error) {
      console.error('DRC 수정 실패:', error)
    }
  }
  
  const handleInputChange = (field: keyof DrcMainCreateRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }
  
  if (error || !drcData) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              데이터를 불러올 수 없습니다
            </h3>
            <div className="mt-2 text-sm text-red-700">
              {error?.message || 'DRC 데이터를 찾을 수 없습니다.'}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">DRC 메인 수정</h1>
        <p className="text-gray-600">DRC 번호: {drcNo}</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>DRC 정보 수정</CardTitle>
          <CardDescription>
            DRC 메인 데이터의 상세 정보를 수정하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  기준일자 *
                </label>
                <Input
                  type="date"
                  value={formData.basicDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('basicDate', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  사업자번호 *
                </label>
                <Input
                  type="text"
                  value={formData.comRegno}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('comRegno', e.target.value)}
                  placeholder="000-00-00000"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  회사명 *
                </label>
                <Input
                  type="text"
                  value={formData.comName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('comName', e.target.value)}
                  placeholder="회사명을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  회사구분 *
                </label>
                <Select value={formData.comType} onValueChange={(value: string) => handleInputChange('comType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="회사구분을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">일반</SelectItem>
                    <SelectItem value="2">간이</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  담당자명 *
                </label>
                <Input
                  type="text"
                  value={formData.memName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('memName', e.target.value)}
                  placeholder="담당자명을 입력하세요"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  미수금액 *
                </label>
                <Input
                  type="number"
                  value={formData.receivableBalance}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('receivableBalance', parseFloat(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/drc/main')}
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={updateDrcMain.isPending}
              >
                {updateDrcMain.isPending ? '수정 중...' : '수정'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
