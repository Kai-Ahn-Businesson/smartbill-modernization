import React, { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';

export const LoginPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // 페이지 로드 시 로그인 상태 확인
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
  };

  if (isLoggedIn && user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                SmartBill 관리자 대시보드
              </h1>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                로그아웃
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">사용자 정보</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">아이디:</span> {user.adminId}</p>
                  <p><span className="font-medium">이름:</span> {user.adminName}</p>
                  <p><span className="font-medium">팀:</span> {user.adminTeam}</p>
                  <p><span className="font-medium">레벨:</span> {user.levelCode}</p>
                  <p><span className="font-medium">관리자 번호:</span> {user.adminNo}</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-2">시스템 상태</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">로그인 시간:</span> {new Date().toLocaleString('ko-KR')}</p>
                  <p><span className="font-medium">상태:</span> <span className="text-green-600">정상</span></p>
                </div>
              </div>
            </div>
            
            {/* TODO: 향후 기능 확장 - 메뉴 관리, 권한 관리 등 */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">개발 진행 상황</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>✅ 로그인 시스템 구현 완료</li>
                <li>🔄 사용자 관리 기능 개발 중</li>
                <li>⏳ 메뉴 권한 관리 기능 계획 중</li>
                <li>⏳ 세금계산서 발행 기능 계획 중</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};
