import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useCreateDrcMain } from '@/hooks/queries/drcQueries'
import type { DrcMainCreateRequest } from '@/types/drc'

export function DrcCreatePage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<DrcMainCreateRequest>({
    basicDate: new Date().toISOString().split('T')[0],
    comRegno: '',
    comName: '',
    comType: '',
    memName: '',
    receivableBalance: 0,
    statusCode: 'PENDING'
  })
  
  const createDrcMain = useCreateDrcMain()
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    try {
      await createDrcMain.mutateAsync(formData)
      navigate('/drc/main')
    } catch (error) {
      console.error('DRC 생성 실패:', error)
    }
  }
  
  const handleInputChange = (field: keyof DrcMainCreateRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">DRC 메인 등록</h1>
        <p className="text-gray-600">새로운 DRC 메인 데이터를 등록합니다.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>DRC 정보 입력</CardTitle>
          <CardDescription>
            DRC 메인 데이터의 상세 정보를 입력하세요
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
                <Select onValueChange={(value: string) => handleInputChange('comType', value)}>
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
                disabled={createDrcMain.isPending}
              >
                {createDrcMain.isPending ? '등록 중...' : '등록'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
