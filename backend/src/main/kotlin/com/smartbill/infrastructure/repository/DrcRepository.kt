package com.smartbill.infrastructure.repository

import com.smartbill.domain.drc.*
import com.smartbill.infrastructure.adapter.StoredProcedureAdapter
import org.springframework.stereotype.Repository

@Repository
class DrcRepository(private val spAdapter: StoredProcedureAdapter) {
    
    fun getDrcMainUserList(params: DrcMainSearchParams): List<DrcMainUser> {
        return spAdapter.executeQuery(
            "SB_DRC.dbo.PrDrc_DrcMainUserList_Q",
            params.toMap(),
            DrcMainUser::class.java
        )
    }
    
    fun getDrcMainUserListForExcel(params: DrcMainSearchParams): List<DrcMainUserExcel> {
        return spAdapter.executeQuery(
            "SB_DRC.dbo.PrDrc_DrcMainUserList_Xls_Q",
            params.toMap(),
            DrcMainUserExcel::class.java
        )
    }
    
    fun insertDrcMain(drcMain: DrcMainCreateRequest): Int {
        return spAdapter.executeUpdate(
            "SB_DRC.dbo.PrDrc_DrcMain_Insert",
            drcMain.toMap()
        )
    }
    
    fun updateDrcMain(drcNo: String, drcMain: DrcMainCreateRequest): Int {
        val params = drcMain.toMap().toMutableMap()
        params["drcNo"] = drcNo
        
        return spAdapter.executeUpdate(
            "SB_DRC.dbo.PrDrc_DrcMain_Update",
            params
        )
    }
    
    fun deleteDrcMain(drcNo: String): Int {
        return spAdapter.executeUpdate(
            "SB_DRC.dbo.PrDrc_DrcMain_Delete",
            mapOf("drcNo" to drcNo)
        )
    }
    
    fun getDrcMainByNo(drcNo: String): DrcMainUser? {
        return spAdapter.executeQueryForSingleResult(
            "SB_DRC.dbo.PrDrc_DrcMain_GetByNo",
            mapOf("drcNo" to drcNo),
            DrcMainUser::class.java
        )
    }
}
