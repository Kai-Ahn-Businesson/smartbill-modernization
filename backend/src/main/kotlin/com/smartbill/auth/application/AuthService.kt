package com.smartbill.auth.application

import com.smartbill.auth.domain.LoginRequest
import com.smartbill.auth.domain.LoginResponse
import com.smartbill.auth.infrastructure.UserRepository
import org.springframework.stereotype.Service
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.time.LocalDateTime

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val jwtService: com.smartbill.auth.infrastructure.JwtService
) {
    
    // TODO: 향후 보안 강화 필요 - JWT 토큰 사용, 세션 관리 개선
    fun login(request: LoginRequest): LoginResponse {
        try {
            println("로그인 시도: ${request.username}")
            
            // 레거시 시스템과 동일한 암호화 방식 사용
            // 1. MD5 해시 생성 (레거시와 동일)
            val passwordMd5 = hashMd5(request.password)
            // 2. SHA256 해시 생성 (레거시와 동일) 
            val passwordSha256 = hashSha256(request.password)
            
            println("MD5 해시: $passwordMd5")
            println("SHA256 해시: $passwordSha256")
            
            // 3. 스마트빌 관리자 인증 시도
            val user = userRepository.authenticateAdminUser(request.username, passwordMd5, passwordSha256)
            
            if (user == null) {
                // 로그인 실패 시 실패 횟수 증가 (레거시 로직과 동일)
                val failCount = userRepository.updateFailCount(request.username)
                
                println("로그인 실패. 실패 횟수: $failCount")
                
                return if (failCount >= 5) {
                    LoginResponse(
                        success = false,
                        message = "비밀번호를 5회이상 일치하지 않아 30분 후에 다시 로그인해주세요.",
                        locked = true
                    )
                } else {
                    LoginResponse(
                        success = false,
                        message = "로그인 실패\\n아이디와 비밀번호를 확인하시기 바랍니다."
                    )
                }
            }
            
            // 로그인 성공하더라도 최근 30분 내 실패 횟수가 5회 이상이면 잠금 (레거시 로직)
            if (user.failCount >= 5) {
                return LoginResponse(
                    success = false,
                    message = "비밀번호를 5회이상 일치하지 않아 30분 후에 다시 로그인해주세요.",
                    locked = true
                )
            }
            
            // TODO: 비밀번호 변경 주기 확인 (레거시와 동일) - 향후 프론트엔드에서 처리
            if (user.pwChangeDate != null) {
                val oneMonthAgo = LocalDateTime.now().minusMonths(1)
                if (user.pwChangeDate.isBefore(oneMonthAgo)) {
                    println("비밀번호 변경이 필요합니다: ${user.pwChangeDate}")
                    // TODO: LoginResponse에 passwordChangeRequired 필드 추가 필요
                }
            }
            
            // 로그인 성공 로그 기록
            userRepository.recordLoginSuccess(request.username)
            
            // JWT 토큰 생성 (레거시 쿠키 대신 JWT 사용)
            val token = jwtService.generateToken(user)
            
            println("로그인 성공: ${user.adminName} (${user.adminId})")
            
            return LoginResponse(
                success = true,
                user = user,
                token = token,
                // TODO: 비밀번호 변경 필요 여부를 프론트엔드로 전달 필요
            )
            
        } catch (e: Exception) {
            println("로그인 처리 중 오류: ${e.message}")
            e.printStackTrace()
            return LoginResponse(
                success = false,
                message = "로그인 처리 중 오류가 발생했습니다."
            )
        }
    }
    
    // TODO: 향후 로그아웃 API 구현 필요
    fun logout(token: String): Boolean {
        // JWT는 stateless이므로 토큰을 무효화할 수 없음
        // 향후 Redis 기반 토큰 블랙리스트 구현 필요
        return true
    }
    
    // TODO: 향후 보안 강화 필요 - MD5는 취약하므로 bcrypt 등으로 교체
    // 레거시 MD5 해시 함수 (정확히 동일하게 구현)
    private fun hashMd5(input: String): String {
        return try {
            val md = MessageDigest.getInstance("MD5")
            val digest = md.digest(input.toByteArray(Charsets.UTF_8))
            // 레거시와 동일한 포맷으로 16진수 변환 (소문자)
            digest.joinToString("") { "%02x".format(it) }
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException("MD5 해시 생성 실패", e)
        }
    }
    
    // TODO: 향후 보안 강화 필요 - SHA256도 단방향 해시이므로 salt 추가 필요  
    // 레거시 SHA256 해시 함수 (정확히 동일하게 구현)
    private fun hashSha256(input: String): String {
        return try {
            val md = MessageDigest.getInstance("SHA-256")
            val digest = md.digest(input.toByteArray(Charsets.UTF_8))
            // 레거시와 동일한 포맷으로 16진수 변환 (소문자)
            digest.joinToString("") { "%02x".format(it) }
        } catch (e: NoSuchAlgorithmException) {
            throw RuntimeException("SHA-256 해시 생성 실패", e)
        }
    }
}
