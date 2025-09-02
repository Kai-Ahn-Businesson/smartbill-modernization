package com.smartbill.api.exception

import com.smartbill.api.drc.ApiResponse
import org.springframework.dao.DataAccessException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import java.time.LocalDateTime

@RestControllerAdvice
class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException::class)
    fun handleValidation(ex: ValidationException): ResponseEntity<ApiResponse<Nothing>> {
        return ResponseEntity.badRequest().body(
            ApiResponse(
                success = false,
                message = ex.message,
                timestamp = LocalDateTime.now().toString()
            )
        )
    }
    
    @ExceptionHandler(DataAccessException::class) 
    fun handleDataAccess(ex: DataAccessException): ResponseEntity<ApiResponse<Nothing>> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            ApiResponse(
                success = false,
                message = "데이터베이스 오류가 발생했습니다: ${ex.message}",
                timestamp = LocalDateTime.now().toString()
            )
        )
    }
    
    @ExceptionHandler(MethodArgumentNotValidException::class)
    fun handleValidationErrors(ex: MethodArgumentNotValidException): ResponseEntity<ApiResponse<Map<String, String>>> {
        val errors = ex.bindingResult.fieldErrors.associate { fieldError ->
            fieldError.field to (fieldError.defaultMessage ?: "유효하지 않은 값입니다")
        }
        
        return ResponseEntity.badRequest().body(
            ApiResponse(
                success = false,
                data = errors,
                message = "입력 데이터 검증에 실패했습니다",
                timestamp = LocalDateTime.now().toString()
            )
        )
    }
    
    @ExceptionHandler(RuntimeException::class)
    fun handleRuntime(ex: RuntimeException): ResponseEntity<ApiResponse<Nothing>> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            ApiResponse(
                success = false,
                message = "서버 오류가 발생했습니다: ${ex.message}",
                timestamp = LocalDateTime.now().toString()
            )
        )
    }
    
    @ExceptionHandler(Exception::class)
    fun handleGeneric(ex: Exception): ResponseEntity<ApiResponse<Nothing>> {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
            ApiResponse(
                success = false,
                message = "알 수 없는 오류가 발생했습니다",
                timestamp = LocalDateTime.now().toString()
            )
        )
    }
}

class ValidationException(message: String) : RuntimeException(message)
