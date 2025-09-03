import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Plus, Search, Filter, Inbox, Send, Archive, Trash2, Paperclip } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockMails } from '@/mocks/mockData'

export function MailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">메일 관리</h1>
          <p className="mt-2 text-gray-600">
            시스템 알림과 메시지를 관리할 수 있습니다.
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>새 메일 작성</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>메일함</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <Inbox className="h-4 w-4 mr-2" />
                  받은 메일함
                  <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{mockMails.filter(m => m.status === '읽지않음').length}</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Send className="h-4 w-4 mr-2" />
                  보낸 메일함
                  <span className="ml-auto bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">8</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Archive className="h-4 w-4 mr-2" />
                  보관함
                  <span className="ml-auto bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">45</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Trash2 className="h-4 w-4 mr-2" />
                  휴지통
                  <span className="ml-auto bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">3</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>받은 메일함</CardTitle>
              <CardDescription>
                총 {mockMails.length}개의 메일이 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <Input placeholder="메일 검색..." />
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

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockMails.slice(0, 10).map((mail) => (
                  <div key={mail.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Mail className={`h-5 w-5 ${
                      mail.status === '읽지않음' ? 'text-blue-600' :
                      mail.status === '중요' ? 'text-red-600' : 'text-gray-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{mail.subject}</h4>
                        {mail.hasAttachment && <Paperclip className="h-3 w-3 text-gray-400" />}
                      </div>
                      <p className="text-sm text-gray-500">{mail.from}</p>
                      <p className="text-xs text-gray-400">{new Date(mail.sentAt).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        mail.status === '읽지않음' ? 'bg-blue-100 text-blue-800' :
                        mail.status === '중요' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {mail.status === '읽지않음' ? '새 메일' : mail.status}
                      </span>
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>메일 설정</CardTitle>
          <CardDescription>
            메일 알림 및 자동화 설정을 관리할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">DRC 처리 완료 알림</h4>
                <p className="text-sm text-gray-500">DRC 처리가 완료될 때마다 메일로 알림을 받습니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">시스템 점검 알림</h4>
                <p className="text-sm text-gray-500">시스템 점검이 예정되거나 완료될 때 알림을 받습니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h4 className="font-medium">보안 경고 알림</h4>
                <p className="text-sm text-gray-500">보안 관련 이벤트가 발생할 때 즉시 알림을 받습니다.</p>
              </div>
              <Button variant="outline" size="sm">설정</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
