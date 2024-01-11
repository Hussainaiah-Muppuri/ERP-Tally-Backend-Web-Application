package com.erp.rest;

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
import org.springframework.web.bind.annotation.RestController;

import com.erp.entity.PurchaseOrderDetailsEntity;
import com.erp.service.PurchaseOrderDetailsService;

@RestController
@CrossOrigin("*")
public class OrderDetailsController {

	@Autowired
	private PurchaseOrderDetailsService orderService;

	@PostMapping("/saveorder")
	public ResponseEntity<String> saveOrder(@RequestBody PurchaseOrderDetailsEntity entity) {
		Boolean saveOrder = orderService.saveOrder(entity);
		if (saveOrder) {
			return new ResponseEntity<String>("purchase order save", HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("purchase order not save", HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@PostMapping("/saveorders")
	public ResponseEntity<List<PurchaseOrderDetailsEntity>> saveAllOrder(
			@RequestBody List<PurchaseOrderDetailsEntity> orders) {
		List<PurchaseOrderDetailsEntity> saveAllOrder = orderService.saveAllOrder(orders);
		return new ResponseEntity<List<PurchaseOrderDetailsEntity>>(saveAllOrder, HttpStatus.CREATED);

	}

	@GetMapping("order/{purchaseOrderId}")
	public Optional<PurchaseOrderDetailsEntity> getPurchaseOrderById(@PathVariable Integer purchaseOrderId) {
		return orderService.getById(purchaseOrderId);
	}

	@DeleteMapping("delete/{purchaseOrderId}")
	public ResponseEntity<String> deleteOrderById(@PathVariable Integer purchaseOrderId) {
		String deleteOrder = orderService.deleteOrderById(purchaseOrderId);
		return new ResponseEntity<>(deleteOrder, HttpStatus.OK);
	}

	@PutMapping("/updateorder/{purchaseOrderId}")
	public PurchaseOrderDetailsEntity updatePurchaseOrder(@PathVariable Integer purchaseOrderId,
			@RequestBody PurchaseOrderDetailsEntity updatedPurchaseOrder) {
		return orderService.updateOrderDetails(purchaseOrderId, updatedPurchaseOrder);
	}

	@GetMapping("/purchaseorder/{userId}/{companyId}")
	public List<PurchaseOrderDetailsEntity> getAllByUserIdCompanyId(@PathVariable Long userId,
			@PathVariable Long companyId) {
		return orderService.getAllByUserIdCompanyId(userId, companyId);
	}

}