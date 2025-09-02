package com.smartbill.api.drc

import com.smartbill.domain.drc.*
import com.smartbill.domain.drc.DrcService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.web.PageableDefault
import org.springframework.format.annotation.DateTimeFormat
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import jakarta.servlet.http.HttpServletResponse
import jakarta.validation.Valid
import java.time.LocalDate

@RestController
@RequestMapping("/api/v1/drc")
@Tag(name = "DRC", description = "DRC 관리 API")
class DrcController(private val drcService: DrcService) {
    
    @GetMapping("/main/users")
    @Operation(summary = "DRC 메인 사용자 목록 조회", description = "검색 조건에 따른 DRC 메인 사용자 목록을 페이징하여 조회합니다.")
    fun getDrcMainUserList(
        @Parameter(description = "시작일자 (yyyy-MM-dd)")
        @RequestParam(required = false) 
        @DateTimeFormat(pattern = "yyyy-MM-dd") startDate: LocalDate?,
        
        @Parameter(description = "종료일자 (yyyy-MM-dd)")
        @RequestParam(required = false) 
        @DateTimeFormat(pattern = "yyyy-MM-dd") endDate: LocalDate?,
        
        @Parameter(description = "회사구분")
        @RequestParam(required = false) companyType: String?,
        
        @Parameter(description = "상태코드")
        @RequestParam(required = false) statusCode: String?,
        
        @Parameter(description = "검색키워드")
        @RequestParam(required = false) keyword: String?,
        
        @PageableDefault(size = 20) pageable: Pageable
    ): ResponseEntity<Page<DrcMainUser>> {
        val params = DrcMainSearchParams(
            startDate = startDate,
            endDate = endDate,
            companyType = companyType,
            statusCode = statusCode,
            keyword = keyword
        )
        
        val result = drcService.getDrcMainUserList(params, pageable)
        return ResponseEntity.ok(result)
    }
    
    @GetMapping("/main/users/excel")
    @Operation(summary = "DRC 메인 사용자 목록 엑셀 다운로드", description = "검색 조건에 따른 DRC 메인 사용자 목록을 엑셀 파일로 다운로드합니다.")
    fun downloadDrcMainUserListExcel(
        @Parameter(description = "시작일자 (yyyy-MM-dd)")
        @RequestParam(required = false) 
        @DateTimeFormat(pattern = "yyyy-MM-dd") startDate: LocalDate?,
        
        @Parameter(description = "종료일자 (yyyy-MM-dd)")
        @RequestParam(required = false) 
        @DateTimeFormat(pattern = "yyyy-MM-dd") endDate: LocalDate?,
        
        @Parameter(description = "회사구분")
        @RequestParam(required = false) companyType: String?,
        
        @Parameter(description = "상태코드")
        @RequestParam(required = false) statusCode: String?,
        
        @Parameter(description = "검색키워드")
        @RequestParam(required = false) keyword: String?,
        
        response: HttpServletResponse
    ) {
        val params = DrcMainSearchParams(
            startDate = startDate,
            endDate = endDate,
            companyType = companyType,
            statusCode = statusCode,
            keyword = keyword
        )
        
        val excelData = drcService.getDrcMainUserListForExcel(params)
        
        // 엑셀 파일 생성 및 다운로드
        response.contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=drc_main_users.xlsx")
        
        // TODO: 실제 엑셀 생성 로직 구현 필요
        // ExcelService.generateExcel(excelData, response.outputStream)
    }
    
    @PostMapping("/main")
    @Operation(summary = "DRC 메인 등록", description = "새로운 DRC 메인 데이터를 등록합니다.")
    fun createDrcMain(
        @Valid @RequestBody request: DrcMainCreateRequest
    ): ResponseEntity<ApiResponse<Long>> {
        val id = drcService.createDrcMain(request)
        return ResponseEntity.ok(ApiResponse.success(id))
    }
    
    @PutMapping("/main/{drcNo}")
    @Operation(summary = "DRC 메인 수정", description = "기존 DRC 메인 데이터를 수정합니다.")
    fun updateDrcMain(
        @PathVariable drcNo: String,
        @Valid @RequestBody request: DrcMainCreateRequest
    ): ResponseEntity<ApiResponse<Boolean>> {
        val result = drcService.updateDrcMain(drcNo, request)
        return ResponseEntity.ok(ApiResponse.success(result))
    }
    
    @DeleteMapping("/main/{drcNo}")
    @Operation(summary = "DRC 메인 삭제", description = "DRC 메인 데이터를 삭제합니다.")
    fun deleteDrcMain(
        @PathVariable drcNo: String
    ): ResponseEntity<ApiResponse<Boolean>> {
        val result = drcService.deleteDrcMain(drcNo)
        return ResponseEntity.ok(ApiResponse.success(result))
    }
    
    @GetMapping("/main/{drcNo}")
    @Operation(summary = "DRC 메인 상세 조회", description = "특정 DRC 번호에 해당하는 상세 정보를 조회합니다.")
    fun getDrcMainByNo(
        @PathVariable drcNo: String
    ): ResponseEntity<ApiResponse<DrcMainUser?>> {
        val result = drcService.getDrcMainByNo(drcNo)
        return ResponseEntity.ok(ApiResponse.success(result))
    }
}

data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val message: String? = null,
    val timestamp: String = java.time.LocalDateTime.now().toString()
) {
    companion object {
        fun <T> success(data: T): ApiResponse<T> = ApiResponse(true, data)
        fun <T> error(message: String): ApiResponse<T> = ApiResponse(false, message = message)
    }
}
