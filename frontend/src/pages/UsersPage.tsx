import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Filter, Shield, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockUsers } from '@/mocks/mockData'

export function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SB 서비스 관리</h1>
          <p className="mt-2 text-gray-600">
            스마트빌의 여러 서비스를 관리할 수 있습니다.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>새 사용자 등록</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>사용자 검색</CardTitle>
          <CardDescription>
            사용자명, 이메일, 팀 등으로 검색할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input placeholder="사용자명, 이메일, 팀을 입력하세요" />
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
          <CardTitle>사용자 목록</CardTitle>
          <CardDescription>
            총 {mockUsers.length}명의 사용자가 등록되어 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {mockUsers.slice(0, 10).map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 ${user.levelCode === 'ADMIN' ? 'bg-blue-100' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                    {user.levelCode === 'ADMIN' ? 
                      <Shield className="h-5 w-5 text-blue-600" /> : 
                      <UserCheck className="h-5 w-5 text-green-600" />
                    }
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.adminName}</h3>
                    <p className="text-sm text-gray-500">{user.adminId}</p>
                    <p className="text-xs text-gray-400">{user.adminTeam}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    {user.levelCode === 'ADMIN' ? (
                      <>
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">관리자</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-blue-600">{user.levelCode === 'USER' ? '일반사용자' : '뷰어'}</span>
                      </>
                    )}
                  </div>
                  <p className={`text-sm ${user.status === '활성' ? 'text-green-600' : 'text-red-600'}`}>
                    {user.status}
                  </p>
                  {user.lastLoginAt && (
                    <p className="text-xs text-gray-400">최종로그인: {new Date(user.lastLoginAt).toLocaleString()}</p>
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
