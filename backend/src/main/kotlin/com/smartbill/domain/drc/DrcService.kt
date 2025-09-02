package com.smartbill.domain.drc

import com.smartbill.infrastructure.repository.DrcRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import java.math.BigDecimal

@Service
@Transactional(readOnly = true)
class DrcService(private val drcRepository: DrcRepository) {
    
    fun getDrcMainUserList(
        params: DrcMainSearchParams, 
        pageable: Pageable
    ): Page<DrcMainUser> {
        val allUsers = drcRepository.getDrcMainUserList(params)
        
        // 간단한 페이징 처리 (실제로는 SP에서 페이징 처리하는 것이 좋음)
        val start = (pageable.pageNumber * pageable.pageSize).toInt()
        val end = minOf(start + pageable.pageSize, allUsers.size)
        
        val pageContent = if (start < allUsers.size) {
            allUsers.subList(start, end)
        } else {
            emptyList()
        }
        
        return PageImpl(pageContent, pageable, allUsers.size.toLong())
    }
    
    fun getDrcMainUserListForExcel(params: DrcMainSearchParams): List<DrcMainUserExcel> {
        return drcRepository.getDrcMainUserListForExcel(params)
    }
    
    @Transactional
    fun createDrcMain(request: DrcMainCreateRequest): Long {
        // 비즈니스 로직 검증
        validateDrcMainRequest(request)
        
        val result = drcRepository.insertDrcMain(request)
        
        if (result <= 0) {
            throw RuntimeException("DRC 메인 등록에 실패했습니다.")
        }
        
        // 실제로는 생성된 ID를 반환해야 하지만, SP 호출 결과로는 확인이 어려움
        // 임시로 1을 반환
        return 1L
    }
    
    @Transactional
    fun updateDrcMain(drcNo: String, request: DrcMainCreateRequest): Boolean {
        // 기존 데이터 존재 확인
        val existing = drcRepository.getDrcMainByNo(drcNo)
        if (existing == null) {
            throw RuntimeException("DRC 번호 $drcNo 에 해당하는 데이터가 없습니다.")
        }
        
        // 비즈니스 로직 검증
        validateDrcMainRequest(request)
        
        val result = drcRepository.updateDrcMain(drcNo, request)
        return result > 0
    }
    
    @Transactional
    fun deleteDrcMain(drcNo: String): Boolean {
        // 기존 데이터 존재 확인
        val existing = drcRepository.getDrcMainByNo(drcNo)
        if (existing == null) {
            throw RuntimeException("DRC 번호 $drcNo 에 해당하는 데이터가 없습니다.")
        }
        
        val result = drcRepository.deleteDrcMain(drcNo)
        return result > 0
    }
    
    fun getDrcMainByNo(drcNo: String): DrcMainUser? {
        return drcRepository.getDrcMainByNo(drcNo)
    }
    
    private fun validateDrcMainRequest(request: DrcMainCreateRequest) {
        require(request.comName.isNotBlank()) { "회사명은 필수입니다." }
        require(request.comRegno.isNotBlank()) { "사업자번호는 필수입니다." }
        require(request.memName.isNotBlank()) { "담당자명은 필수입니다." }
        require(request.receivableBalance >= BigDecimal.ZERO) { "미수금액은 0 이상이어야 합니다." }
    }
}
