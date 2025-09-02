package com.smartbill.auth.infrastructure

import jakarta.servlet.FilterChain
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter

@Component
class JwtAuthenticationFilter(
    private val jwtService: JwtService
) : OncePerRequestFilter() {
    
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        try {
            // Authorization 헤더에서 JWT 토큰 추출
            val authHeader = request.getHeader("Authorization")
            
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                filterChain.doFilter(request, response)
                return
            }
            
            val token = authHeader.substring(7)
            
            // 토큰 검증
            if (!jwtService.validateToken(token)) {
                filterChain.doFilter(request, response)
                return
            }
            
            // 토큰에서 사용자 정보 추출
            val username = jwtService.getUsernameFromToken(token)
            val userInfo = jwtService.getUserInfoFromToken(token)
            
            if (username != null && SecurityContextHolder.getContext().authentication == null) {
                // 권한 설정 (레거시 레벨 코드 기반)
                val authorities = mutableListOf<SimpleGrantedAuthority>()
                
                userInfo?.let { info ->
                    val adminLevel = info["adminLevel"] as? String
                    when (adminLevel) {
                        "1" -> {
                            authorities.add(SimpleGrantedAuthority("ROLE_ADMIN"))
                            authorities.add(SimpleGrantedAuthority("ROLE_MANAGER"))
                            authorities.add(SimpleGrantedAuthority("ROLE_USER"))
                        }
                        "2" -> {
                            authorities.add(SimpleGrantedAuthority("ROLE_MANAGER"))
                            authorities.add(SimpleGrantedAuthority("ROLE_USER"))
                        }
                        else -> {
                            authorities.add(SimpleGrantedAuthority("ROLE_USER"))
                        }
                    }
                }
                
                // TODO: 향후 UserDetails 구현체로 교체 필요
                val authentication = UsernamePasswordAuthenticationToken(
                    username, 
                    null,
                    authorities
                )
                
                // 요청에 사용자 정보 추가 (컨트롤러에서 사용 가능)
                request.setAttribute("userInfo", userInfo)
                
                SecurityContextHolder.getContext().authentication = authentication
            }
        } catch (e: Exception) {
            logger.error("JWT Authentication failed: ${e.message}")
        }
        
        filterChain.doFilter(request, response)
    }
    
    // 로그인, 헬스체크 등은 인증 필터 적용 제외
    override fun shouldNotFilter(request: HttpServletRequest): Boolean {
        val path = request.requestURI
        return path.startsWith("/api/auth/") || 
               path.startsWith("/actuator/") ||
               path.startsWith("/swagger-ui/") ||
               path.startsWith("/v3/api-docs")
    }
}