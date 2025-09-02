package com.smartbill.auth.presentation

import com.smartbill.auth.application.AuthService
import com.smartbill.auth.domain.LoginRequest
import com.smartbill.auth.domain.LoginResponse
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val authService: AuthService
) {
    
    @PostMapping("/login")
    fun login(@RequestBody request: LoginRequest): ResponseEntity<LoginResponse> {
        val response = authService.login(request)
        
        return if (response.success) {
            ResponseEntity.ok(response)
        } else {
            ResponseEntity.badRequest().body(response)
        }
    }
    
    @PostMapping("/logout")
    fun logout(): ResponseEntity<Map<String, String>> {
        // TODO: 향후 JWT 블랙리스트 구현 시 토큰 무효화 로직 추가
        // 현재는 클라이언트에서 토큰 삭제로 처리
        return ResponseEntity.ok(mapOf("success" to "true", "message" to "로그아웃 되었습니다."))
    }
    
    @GetMapping("/health")
    fun health(): ResponseEntity<Map<String, String>> {
        return ResponseEntity.ok(mapOf("status" to "OK", "service" to "SmartBill Auth Service"))
    }
}
