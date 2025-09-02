package com.smartbill.auth.infrastructure

import com.smartbill.auth.domain.GroupwareUser
import com.smartbill.auth.domain.User
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Repository
import java.sql.ResultSet
import java.time.LocalDateTime

@Repository
class UserRepository(private val jdbcTemplate: JdbcTemplate) {
    
    // TODO: 향후 보안 강화 필요 - SQL Injection 방지, PreparedStatement 사용
    // 스마트빌 관리자 로그인 (SmartBill3.upAdmSB_Login)
    fun authenticateAdminUser(username: String, passwordMd5: String, passwordSha256: String): User? {
        val sql = "EXEC smartbill3.dbo.upAdmSB_Login ?, ?, ?"
        
        return try {
            jdbcTemplate.queryForObject(sql, adminUserRowMapper, username, passwordMd5, passwordSha256)
        } catch (e: Exception) {
            println("Admin 로그인 실패: ${e.message}")
            null
        }
    }
    
    // 그룹웨어 로그인 (office.upGW_Login) - 향후 사용 예정
    // TODO: 현재는 관리자 로그인만 구현, 향후 그룹웨어 로그인 통합 필요
    fun authenticateGroupwareUser(username: String, passwordMd5: String, passwordSha256: String): GroupwareUser? {
        val sql = "EXEC office.dbo.upGW_Login ?, ?, ?"
        
        return try {
            jdbcTemplate.queryForObject(sql, groupwareUserRowMapper, username, passwordMd5, passwordSha256)
        } catch (e: Exception) {
            println("Groupware 로그인 실패: ${e.message}")
            null
        }
    }
    
    // 로그인 실패 횟수 업데이트 및 조회 (smartbill3.upAdmSB_LoginFail)
    fun updateFailCount(username: String): Int {
        val sql = "EXEC smartbill3.dbo.upAdmSB_LoginFail ?, 'admin'"
        
        return try {
            val result = jdbcTemplate.queryForObject(sql, Int::class.java, username)
            result ?: 0
        } catch (e: Exception) {
            println("실패 횟수 업데이트 실패: ${e.message}")
            0
        }
    }
    
    // TODO: 향후 로그인 성공 로그 기록 필요
    fun recordLoginSuccess(username: String, ipAddress: String? = null) {
        // 현재는 레거시 시스템과 동일하게 별도 기록 없음
        // 향후 보안 강화 시 ADMIN_LOGIN_HIS 테이블에 성공 로그 추가 필요
    }
    
    // 관리자 사용자 매퍼 (upAdmSB_Login 결과 매핑)
    private val adminUserRowMapper = RowMapper<User> { rs: ResultSet, _: Int ->
        User(
            adminId = rs.getString("admin_id") ?: "",
            adminName = rs.getString("admin_name") ?: "",
            adminTeam = rs.getString("admin_team") ?: "",
            levelCode = rs.getString("level_code") ?: "",
            adminNo = rs.getInt("admin_no"),
            pwChangeDate = rs.getTimestamp("pw_change_date")?.toLocalDateTime(),
            sha256YN = rs.getString("sha256_YN") ?: "N",
            failCount = rs.getInt("failCount")
        )
    }
    
    // 그룹웨어 사용자 매퍼 (upGW_Login 결과 매핑)
    private val groupwareUserRowMapper = RowMapper<GroupwareUser> { rs: ResultSet, _: Int ->
        GroupwareUser(
            swNo = rs.getInt("SW_NO"),
            sid = rs.getString("SID") ?: "",
            sname = rs.getString("SNAME") ?: "",
            className = rs.getString("CLASS") ?: "",
            job = rs.getString("JOB") ?: "",
            swEmail = rs.getString("SW_EMAIL"),
            birthdayType = rs.getString("BIRTHDAY_TYPE"),
            birthday = rs.getString("BIRTHDAY"),
            adminType = rs.getString("ADMIN_TYPE"),
            joinDate = rs.getTimestamp("JOIN_DATE")?.toLocalDateTime(),
            leaveDate = rs.getTimestamp("LEAVE_DATE")?.toLocalDateTime(),
            leaveYn = rs.getString("LEAVE_YN") ?: "N",
            deptNo = rs.getString("DEPT_NO"),
            deptName = rs.getString("DEPT_NAME"),
            failCount = rs.getInt("FailCount")
        )
    }
}
