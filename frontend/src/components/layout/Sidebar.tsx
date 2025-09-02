import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { 
  Home, 
  FileText, 
  Users, 
  Settings, 
  BarChart3,
  Building2,
  Calendar,
  Mail
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    path: '/',
    label: '대시보드',
    icon: Home
  },
  {
    path: '/drc/main',
    label: 'DRC 관리',
    icon: FileText
  },
  {
    path: '/company',
    label: '기업 관리',
    icon: Building2
  },
  {
    path: '/users',
    label: '사용자 관리',
    icon: Users
  },
  {
    path: '/schedule',
    label: '스케줄',
    icon: Calendar
  },
  {
    path: '/reports',
    label: '리포트',
    icon: BarChart3
  },
  {
    path: '/mail',
    label: '메일 관리',
    icon: Mail
  },
  {
    path: '/settings',
    label: '시스템 설정',
    icon: Settings
  }
]

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r transition-transform duration-300 z-40",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <nav className="p-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors mb-1",
              isActive 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
