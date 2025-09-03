import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Download, Calendar, TrendingUp, TrendingDown, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockReports } from '@/mocks/mockData'

export function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">SB 운영 관리</h1>
          <p className="mt-2 text-gray-600">
            스마트빌 서비스 운영에 대한 관리 화면입니다.
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            기간 선택
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 처리 건수</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,456</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+15.2%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 처리 시간</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3분</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-8.5%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">성공률</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.7%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-green-600" />
              <span className="text-green-600">+0.3%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오류 발생률</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.3%</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600" />
              <span className="text-green-600">-0.3%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>월별 처리 현황</CardTitle>
            <CardDescription>
              최근 6개월간의 처리 건수 추이입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">8월</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">9,234건</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">9월</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">9,876건</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">10월</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">10,234건</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>처리 유형별 현황</CardTitle>
            <CardDescription>
              DRC 유형별 처리 건수 분포입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">일반 DRC</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">7,456건</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">긴급 DRC</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">3,123건</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">특별 DRC</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm text-gray-500">1,877건</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>생성된 리포트 목록</CardTitle>
          <CardDescription>
            총 {mockReports.length}개의 리포트가 생성되어 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {mockReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{report.title}</h3>
                    <p className="text-sm text-gray-500">{report.type} 리포트 • {report.period}</p>
                    <p className="text-xs text-gray-400">크기: {report.fileSize} • 다운로드: {report.downloadCount}회</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    report.status === '생성완료' ? 'text-green-600' :
                    report.status === '생성중' ? 'text-blue-600' :
                    report.status === '오류' ? 'text-red-600' : 'text-yellow-600'
                  }`}>
                    {report.status}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </p>
                  {report.status === '생성완료' && (
                    <Button size="sm" variant="outline" className="mt-1">
                      <Download className="h-3 w-3 mr-1" />
                      다운로드
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
