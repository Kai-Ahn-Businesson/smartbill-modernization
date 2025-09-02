package com.smartbill

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SmartBillApplication

fun main(args: Array<String>) {
    runApplication<SmartBillApplication>(*args)
}
