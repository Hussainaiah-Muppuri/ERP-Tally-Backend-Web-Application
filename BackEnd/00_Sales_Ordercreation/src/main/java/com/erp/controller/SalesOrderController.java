package com.erp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.entity.SalesOrderEntity;
import com.erp.service.SalesOrderService;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SalesOrderController {
	@Autowired
	private SalesOrderService salesService;

	@PostMapping("/save")
	public ResponseEntity<String> createSales(@RequestBody SalesOrderEntity sales) {
		String status = salesService.save(sales);
		return new ResponseEntity<>(status, HttpStatus.CREATED);
	}

	@PostMapping("/saveall")
	public ResponseEntity<List<SalesOrderEntity>> saveAll(@RequestBody List<SalesOrderEntity> sales) {
		List<SalesOrderEntity> savedSales = salesService.saveAll(sales);
		return new ResponseEntity<>(savedSales, HttpStatus.CREATED);
	}

	@PutMapping("/update/{salesOrderNo}")
	public ResponseEntity<String> updateSales(@PathVariable Long salesOrderNo, @RequestBody SalesOrderEntity entity) {
		String status = salesService.update(salesOrderNo, entity);
		return new ResponseEntity<>(status, HttpStatus.OK);
	}

	@GetMapping("/sales/{salesOrderNo}")
	public ResponseEntity<SalesOrderEntity> getSales(@PathVariable Long salesOrderNo) {
		SalesOrderEntity sales = salesService.getById(salesOrderNo);
		return new ResponseEntity<>(sales, HttpStatus.OK);
	}

	@DeleteMapping("/sales/{salesOrderNo}")
	public ResponseEntity<String> deleteSales(@PathVariable Long salesOrderNo) {
		String status = salesService.deleteBySalesOrder(salesOrderNo);
		return new ResponseEntity<>(status, HttpStatus.OK);
	}

	@GetMapping("/sales/getAllBy/{userId}/{companyId}")
	public ResponseEntity<List<SalesOrderEntity>> getAllSalesOrdersByUserIdAndCompanyId(@PathVariable Long userId,
			@PathVariable Long companyId) {
		List<SalesOrderEntity> salesOrders = salesService.getAllSalesOrdersByUserIdAndCompanyId(userId, companyId);
		return new ResponseEntity<>(salesOrders, HttpStatus.OK);
	}

	@GetMapping("/sales/getByOrderNo/{orderNo}")
	public ResponseEntity<SalesOrderEntity> getSalesOrderByOrderNo(@PathVariable String orderNo) {
		Optional<SalesOrderEntity> salesOrder = salesService.getSalesOrderByOrderNo(orderNo);
		return salesOrder.map(entity -> new ResponseEntity<>(entity, HttpStatus.OK))
				.orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
}