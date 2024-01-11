package com.stockitem.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockitem.entity.StockItemEntity;

public interface StockItemRepository extends JpaRepository<StockItemEntity, Long> {
	
	public List<StockItemEntity> getAll(Long userId, Long companyId);

}
