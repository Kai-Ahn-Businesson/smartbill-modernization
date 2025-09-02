package com.smartbill.infrastructure.adapter

import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Component
import java.sql.ResultSet
import java.sql.ResultSetMetaData
import java.util.*

@Component
class StoredProcedureAdapter(
    private val jdbcTemplate: JdbcTemplate,
    private val objectMapper: ObjectMapper
) {
    
    fun <T> executeQuery(
        spName: String, 
        params: Map<String, Any>, 
        resultType: Class<T>
    ): List<T> {
        val sql = buildCallableStatement(spName, params.keys)
        val paramValues = params.values.toTypedArray()
        
        return jdbcTemplate.query(sql, paramValues) { rs, _ ->
            mapResultSetToObject(rs, resultType)
        }
    }
    
    fun executeUpdate(spName: String, params: Map<String, Any>): Int {
        val sql = buildCallableStatement(spName, params.keys)
        val paramValues = params.values.toTypedArray()
        
        return jdbcTemplate.update(sql, *paramValues)
    }
    
    fun <T> executeQueryForSingleResult(
        spName: String,
        params: Map<String, Any>,
        resultType: Class<T>
    ): T? {
        val results = executeQuery(spName, params, resultType)
        return results.firstOrNull()
    }
    
    private fun buildCallableStatement(spName: String, paramNames: Set<String>): String {
        val placeholders = paramNames.joinToString(",") { "?" }
        return "{call $spName($placeholders)}"
    }
    
    private fun <T> mapResultSetToObject(rs: ResultSet, resultType: Class<T>): T {
        val data = extractResultSetData(rs)
        return objectMapper.convertValue(data, resultType)
    }
    
    private fun extractResultSetData(rs: ResultSet): Map<String, Any> {
        val metaData: ResultSetMetaData = rs.metaData
        val columnCount = metaData.columnCount
        val data = mutableMapOf<String, Any>()
        
        for (i in 1..columnCount) {
            val columnName = metaData.getColumnLabel(i)
            val columnValue = rs.getObject(i)
            
            if (columnValue != null) {
                data[columnName] = columnValue
            }
        }
        
        return data
    }
}
