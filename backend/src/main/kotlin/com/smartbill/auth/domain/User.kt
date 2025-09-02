package com.smartbill.auth.domain

import java.time.LocalDateTime

// TODO: 향후 JPA Entity로 전환 시 @Entity, @Table 어노테이션 추가 필요
data class User(
    val adminId: String,               // admin_id
    val adminName: String,             // admin_name  
    val adminTeam: String,             // admin_team
    val levelCode: String,             // level_code
    val adminNo: Int,                  // admin_no
    val pwChangeDate: LocalDateTime?,  // pw_change_date - 비밀번호 변경일
    val sha256YN: String,              // sha256_YN - SHA256 사용 여부
    val failCount: Int = 0,            // 로그인 실패 횟수 (최근 30분 내)
    val lastLoginAt: LocalDateTime? = null
)

// 그룹웨어 사용자 (SAWON 테이블)
// TODO: 향후 Single User 모델로 통합 검토 필요
data class GroupwareUser(
    val swNo: Int,                     // SW_NO - 사원 번호
    val sid: String,                   // SID - 사원 ID
    val sname: String,                 // SNAME - 사원 이름
    val className: String,             // CLASS - 직급
    val job: String,                   // JOB - 직무
    val swEmail: String?,              // SW_EMAIL
    val birthdayType: String?,         // BIRTHDAY_TYPE
    val birthday: String?,             // BIRTHDAY
    val adminType: String?,            // ADMIN_TYPE
    val joinDate: LocalDateTime?,      // JOIN_DATE
    val leaveDate: LocalDateTime?,     // LEAVE_DATE
    val leaveYn: String,               // leave_yn
    val deptNo: String?,               // DEPT_NO
    val deptName: String?,             // DEPT_NAME
    val failCount: Int = 0
)

data class LoginRequest(
    val username: String,
    val password: String
)

data class LoginResponse(
    val success: Boolean,
    val message: String? = null,
    val user: User? = null,
    val groupwareUser: GroupwareUser? = null,
    val token: String? = null,
    val locked: Boolean = false        // 계정 잠금 여부 (5회 실패 시)
)
