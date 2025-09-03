import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Plus, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockCompanies } from '@/mocks/mockData'

export function CompanyPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">기업 관리</h1>
          <p className="mt-2 text-gray-600">
            등록된 기업 정보를 관리할 수 있습니다.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>새 기업 등록</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>기업 검색</CardTitle>
          <CardDescription>
            기업명, 사업자번호 등으로 검색할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input placeholder="기업명 또는 사업자번호를 입력하세요" />
            </div>
            <Button variant="outline">
              <Search className="h-4 w-4 mr-2" />
              검색
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>기업 목록</CardTitle>
          <CardDescription>
            총 {mockCompanies.length}개 기업이 등록되어 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockCompanies.slice(0, 10).map((company) => (
              <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <Building2 className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-sm text-gray-500">사업자번호: {company.regNo}</p>
                    <p className="text-xs text-gray-400">{company.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">등록일: {company.registDate}</p>
                  <p className={`text-sm ${company.status === '활성' ? 'text-green-600' : company.status === '비활성' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {company.status}
                  </p>
                  {company.lastLoginAt && (
                    <p className="text-xs text-gray-400">최종접속: {new Date(company.lastLoginAt).toLocaleDateString()}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline">더 보기</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
