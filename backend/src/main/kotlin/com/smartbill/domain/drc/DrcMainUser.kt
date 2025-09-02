package com.smartbill.domain.drc

import java.math.BigDecimal
import java.time.LocalDate
import java.time.LocalDateTime

data class DrcMainUser(
    val drcNo: String,
    val basicDate: LocalDate,
    val comRegno: String,
    val comName: String,
    val comType: String,
    val memName: String,
    val receivableBalance: BigDecimal,
    val statusCode: String,
    val transferStatus: String,
    val regDate: LocalDateTime,
    val confirmYn: String
)

data class DrcMainUserExcel(
    val drcNo: String,
    val basicDate: LocalDate,
    val comRegno: String,
    val comName: String,
    val comType: String,
    val memName: String,
    val receivableBalance: BigDecimal,
    val statusCode: String,
    val transferStatus: String,
    val regDate: LocalDateTime,
    val confirmYn: String
)

data class DrcMainSearchParams(
    val startDate: LocalDate?,
    val endDate: LocalDate?,
    val companyType: String?,
    val statusCode: String?,
    val keyword: String?
) {
    fun toMap(): Map<String, Any> = mapOf(
        "startDate" to (startDate ?: LocalDate.now().minusMonths(1)),
        "endDate" to (endDate ?: LocalDate.now()),
        "companyType" to (companyType ?: ""),
        "statusCode" to (statusCode ?: ""),
        "keyword" to (keyword ?: "")
    )
}

data class DrcMainCreateRequest(
    val basicDate: LocalDate,
    val comRegno: String,
    val comName: String,
    val comType: String,
    val memName: String,
    val receivableBalance: BigDecimal,
    val statusCode: String = "PENDING"
) {
    fun toMap(): Map<String, Any> = mapOf(
        "basicDate" to basicDate,
        "comRegno" to comRegno,
        "comName" to comName,
        "comType" to comType,
        "memName" to memName,
        "receivableBalance" to receivableBalance,
        "statusCode" to statusCode
    )
}
