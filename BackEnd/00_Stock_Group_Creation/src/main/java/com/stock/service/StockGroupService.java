package com.stock.service;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;

import com.stock.entity.StockGroupEntity;

public interface StockGroupService {

	public ResponseEntity<String> saveStock(StockGroupEntity stock);

	public ResponseEntity<String> update(Long stockGroupId, StockGroupEntity updateStock);

	public List<StockGroupEntity> saveAll(List<StockGroupEntity> stocks);

	public Optional<StockGroupEntity> getByStockGroupId(Long stockGroupId);

	public ResponseEntity<String> deleteByStockGroupId(Long stockGroupId);

	List<StockGroupEntity> getByUserIdAndCompanyId(Long userId, Long companyId);

}
