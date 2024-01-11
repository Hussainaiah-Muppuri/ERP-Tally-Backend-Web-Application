package com.stockitem.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stockitem.entity.StockItemEntity;

import java.util.List;

@Repository
public interface StockItemRepository extends JpaRepository<StockItemEntity, Long> {
	List<StockItemEntity> findByUserIdAndCompanyId(Long userId, Long companyId);
}
