import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, Plus, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockSchedules } from '@/mocks/mockData'

export function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">광고/마케팅 운영관리</h1>
          <p className="mt-2 text-gray-600">
              광고/마케팅 운영관리할 수 있습니다.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>새 스케줄 등록</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>오늘의 스케줄</CardTitle>
            <CardDescription>
              오늘 예정된 작업들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {mockSchedules.filter(s => s.status === '예정' || s.status === '진행중').slice(0, 5).map((schedule) => (
                <div key={schedule.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  {schedule.status === '진행중' ? 
                    <Clock className="h-5 w-5 text-blue-600" /> :
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  }
                  <div className="flex-1">
                    <h4 className="font-medium">{schedule.title}</h4>
                    <p className="text-sm text-gray-500">{schedule.assignedTo} • {schedule.priority} 우선순위</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    schedule.status === '진행중' ? 'bg-blue-100 text-blue-800' :
                    schedule.status === '예정' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {schedule.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>주간 스케줄</CardTitle>
            <CardDescription>
              이번 주 예정된 주요 작업들입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">월요일</span>
                <span className="text-sm text-gray-500">데이터 백업</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">화요일</span>
                <span className="text-sm text-gray-500">시스템 점검</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">수요일</span>
                <span className="text-sm text-gray-500">보안 업데이트</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">목요일</span>
                <span className="text-sm text-gray-500">성능 모니터링</span>
              </div>
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium">금요일</span>
                <span className="text-sm text-gray-500">주간 리포트 생성</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>반복 스케줄</CardTitle>
          <CardDescription>
            정기적으로 실행되는 시스템 작업들입니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <h4 className="font-medium">일일 데이터 백업</h4>
                  <p className="text-sm text-gray-500">매일 오전 2:00</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">활성</span>
                <p className="text-xs text-gray-500 mt-1">다음 실행: 내일 02:00</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">주간 시스템 점검</h4>
                  <p className="text-sm text-gray-500">매주 화요일 오후 6:00</p>
                </div>
              </div>
              <div className="text-right">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">활성</span>
                <p className="text-xs text-gray-500 mt-1">다음 실행: 화요일 18:00</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
