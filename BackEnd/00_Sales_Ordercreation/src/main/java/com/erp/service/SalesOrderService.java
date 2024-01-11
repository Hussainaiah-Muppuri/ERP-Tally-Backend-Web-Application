package com.erp.service;
import java.util.List;
import java.util.Optional;

import com.erp.entity.SalesOrderEntity;
public interface SalesOrderService {
	
	public String save(SalesOrderEntity sales);
	
	public String update(Long salesOrderNo, SalesOrderEntity entity);
	
	public List<SalesOrderEntity> saveAll(List<SalesOrderEntity> sales);

	public SalesOrderEntity getById(Long salesOrderNo);

	public String deleteBySalesOrder(Long salesOrderNo);

	List<SalesOrderEntity> getAllSalesOrdersByUserIdAndCompanyId(Long userId, Long companyId);

	Optional<SalesOrderEntity> getSalesOrderByOrderNo(String orderNo);
    	
}
