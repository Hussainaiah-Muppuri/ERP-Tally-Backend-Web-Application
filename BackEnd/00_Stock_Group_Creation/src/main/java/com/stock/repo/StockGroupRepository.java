package com.stock.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stock.entity.StockGroupEntity;

@Repository
public interface StockGroupRepository extends JpaRepository<StockGroupEntity, Long> {
	List<StockGroupEntity> findByUserIdAndCompanyId(Long userId, Long companyId);
}