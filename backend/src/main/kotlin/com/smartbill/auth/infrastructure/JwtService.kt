package com.smartbill.auth.infrastructure

import com.smartbill.auth.domain.User
import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.security.Keys
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.util.*
import javax.crypto.SecretKey

@Service
class JwtService(
    @Value("\${app.jwt.secret:SmartBillSecretKeyForJWTTokenGeneration2024}") 
    private val jwtSecret: String,
    @Value("\${app.jwt.expiration:3600000}") // 1시간 (레거시와 동일)
    private val jwtExpiration: Long
) {
    
    private val secretKey: SecretKey by lazy {
        Keys.hmacShaKeyFor(jwtSecret.toByteArray())
    }
    
    // TODO: 향후 Refresh Token 구현 필요
    fun generateToken(user: User): String {
        val claims: MutableMap<String, Any> = HashMap()
        
        // 레거시 쿠키 정보와 동일한 클레임 추가
        claims["adminId"] = user.adminId
        claims["adminName"] = user.adminName
        claims["adminTeam"] = user.adminTeam
        claims["adminLevel"] = user.levelCode
        claims["adminNo"] = user.adminNo
//        claims["menuDetailPath"] = user.menuDetailPath ?: ""
        
        return createToken(claims, user.adminId)
    }
    
    private fun createToken(claims: Map<String, Any>, subject: String): String {
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(subject)
            .setIssuedAt(Date(System.currentTimeMillis()))
            .setExpiration(Date(System.currentTimeMillis() + jwtExpiration))
            .signWith(secretKey, SignatureAlgorithm.HS256)
            .compact()
    }
    
    fun validateToken(token: String): Boolean {
        return try {
            Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
            true
        } catch (e: Exception) {
            false
        }
    }
    
    fun getUsernameFromToken(token: String): String? {
        return try {
            val claims = getAllClaimsFromToken(token)
            claims.subject
        } catch (e: Exception) {
            null
        }
    }
    
    fun getUserInfoFromToken(token: String): Map<String, Any>? {
        return try {
            val claims = getAllClaimsFromToken(token)
            mapOf(
                "adminId" to (claims["adminId"] ?: ""),
                "adminName" to (claims["adminName"] ?: ""),
                "adminTeam" to (claims["adminTeam"] ?: ""),
                "adminLevel" to (claims["adminLevel"] ?: ""),
                "adminNo" to (claims["adminNo"] ?: 0),
                "menuDetailPath" to (claims["menuDetailPath"] ?: "")
            )
        } catch (e: Exception) {
            null
        }
    }
    
    fun isTokenExpired(token: String): Boolean {
        return try {
            val expiration = getAllClaimsFromToken(token).expiration
            expiration.before(Date())
        } catch (e: Exception) {
            true
        }
    }
    
    private fun getAllClaimsFromToken(token: String): Claims {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey)
            .build()
            .parseClaimsJws(token)
            .body
    }
}