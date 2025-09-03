import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Database, Bell, Monitor, Users, Key, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockSettings } from '@/mocks/mockData'

export function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">시스템 설정</h1>
        <p className="mt-2 text-gray-600">
          시스템 전반의 설정을 관리할 수 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-600" />
              <span>보안 설정</span>
            </CardTitle>
            <CardDescription>
              시스템 보안 관련 설정을 관리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">2단계 인증</h4>
                <p className="text-sm text-gray-500">로그인 시 추가 보안 단계를 요구합니다.</p>
              </div>
              <div className="flex items-center space-x-2">
                {mockSettings.security.twoFactorAuth ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <Button variant="outline" size="sm">설정</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">세션 타임아웃</h4>
                <p className="text-sm text-gray-500">현재: {mockSettings.security.sessionTimeout}분</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">최대 로그인 시도 횟수</h4>
                <p className="text-sm text-gray-500">현재: {mockSettings.security.maxLoginAttempts}회</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <span>데이터베이스 설정</span>
            </CardTitle>
            <CardDescription>
              데이터베이스 연결 및 백업 설정을 관리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">자동 백업</h4>
                <p className="text-sm text-gray-500">
                  상태: {mockSettings.system.backupEnabled ? '활성화' : '비활성화'}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {mockSettings.system.backupEnabled ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <Button variant="outline" size="sm">설정</Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">마지막 백업</h4>
                <p className="text-sm text-gray-500">
                  {new Date(mockSettings.system.lastBackup).toLocaleString()}
                </p>
              </div>
              <Button variant="outline" size="sm">백업 실행</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">유지보수 모드</h4>
                <p className="text-sm text-gray-500">
                  현재: {mockSettings.system.maintenanceMode ? '활성화' : '비활성화'}
                </p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-yellow-600" />
              <span>알림 설정</span>
            </CardTitle>
            <CardDescription>
              시스템 알림 및 이메일 설정을 관리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">이메일 알림</h4>
                <p className="text-sm text-gray-500">중요한 이벤트 발생 시 이메일로 알림을 받습니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">브라우저 알림</h4>
                <p className="text-sm text-gray-500">브라우저에서 실시간 알림을 받습니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">알림 우선순위</h4>
                <p className="text-sm text-gray-500">알림의 중요도별 우선순위를 설정합니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="h-5 w-5 text-purple-600" />
              <span>시스템 모니터링</span>
            </CardTitle>
            <CardDescription>
              시스템 성능 및 상태 모니터링 설정을 관리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">성능 모니터링</h4>
                <p className="text-sm text-gray-500">시스템 성능 지표를 실시간으로 모니터링합니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">로그 수집</h4>
                <p className="text-sm text-gray-500">시스템 로그를 자동으로 수집하고 분석합니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">경고 임계값</h4>
                <p className="text-sm text-gray-500">시스템 경고를 발생시킬 임계값을 설정합니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <span>사용자 권한 관리</span>
          </CardTitle>
          <CardDescription>
            사용자별 권한 및 역할 설정을 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">역할 기반 접근 제어</h4>
              <p className="text-sm text-gray-500">사용자 역할에 따른 기능 접근 권한을 설정합니다.</p>
            </div>
            <Button variant="outline">권한 관리</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-red-600" />
            <span>API 키 관리</span>
          </CardTitle>
          <CardDescription>
            외부 시스템 연동을 위한 API 키를 관리합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">API 키 생성 및 관리</h4>
              <p className="text-sm text-gray-500">외부 시스템과의 연동을 위한 API 키를 생성하고 관리합니다.</p>
            </div>
            <Button variant="outline">API 키 관리</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
