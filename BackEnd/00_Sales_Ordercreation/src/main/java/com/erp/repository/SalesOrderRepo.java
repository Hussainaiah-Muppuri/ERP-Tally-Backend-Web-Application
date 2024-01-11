package com.erp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erp.entity.SalesOrderEntity;

@Repository
public interface SalesOrderRepo extends JpaRepository<SalesOrderEntity, Long> {

	Optional<SalesOrderEntity> findBySalesOrderNo(Long salesOrderNo);

	boolean existsBySalesOrderNo(Long salesOrderNo);

	List<SalesOrderEntity> findByUserIdAndCompanyId(Long userId, Long companyId);

	Optional<SalesOrderEntity> findByOrderNo(String orderNo);
}
