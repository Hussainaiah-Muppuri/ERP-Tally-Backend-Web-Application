package com.stock.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.stock.entity.StockGroupEntity;
import com.stock.service.StockGroupService;

@CrossOrigin("*")
@RequestMapping("/stockgroup")
@RestController
public class StockGroupController {
	@Autowired
	private StockGroupService stockService;

	@PostMapping("/save")
	public ResponseEntity<String> saveStock(@RequestBody StockGroupEntity stock) {
		return stockService.saveStock(stock);
	}

	@DeleteMapping("/delete/{stockGroupId}")
	public ResponseEntity<String> deleteByStockGroupId(@PathVariable Long stockGroupId) {
		return stockService.deleteByStockGroupId(stockGroupId);
	}

	@PutMapping("/update/{stockGroupId}")
	public ResponseEntity<String> update(@PathVariable Long stockGroupId, @RequestBody StockGroupEntity updateStock) {
		return stockService.update(stockGroupId, updateStock);
	}

	@PostMapping("/saveall")
	public ResponseEntity<List<StockGroupEntity>> saveAll(@RequestBody List<StockGroupEntity> stocks) {
		List<StockGroupEntity> results = stockService.saveAll(stocks);
		return ResponseEntity.ok(results);
	}

	@GetMapping("/get/{stockGroupId}")
	public ResponseEntity<StockGroupEntity> getByStockGroupId(@PathVariable Long stockGroupId) {
		Optional<StockGroupEntity> result = stockService.getByStockGroupId(stockGroupId);
		return result.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/getByUserAndCompany/{userId}/{companyId}")
	public ResponseEntity<List<StockGroupEntity>> getByUserIdAndCompanyId(@PathVariable Long userId,
			@PathVariable Long companyId) {
		List<StockGroupEntity> result = stockService.getByUserIdAndCompanyId(userId, companyId);
		return ResponseEntity.ok(result);
	}

}
