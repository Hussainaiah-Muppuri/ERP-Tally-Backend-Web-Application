package com.erp.service;

import java.util.List;
import java.util.Optional;

import com.erp.entity.PurchaseOrderDetailsEntity;

public interface PurchaseOrderDetailsService {

	public Boolean saveOrder(PurchaseOrderDetailsEntity entity);

	public List<PurchaseOrderDetailsEntity> saveAllOrder(List<PurchaseOrderDetailsEntity> entities);

	public Optional<PurchaseOrderDetailsEntity> getById(Integer id);

	public String deleteOrderById(Integer id);

	List<PurchaseOrderDetailsEntity> getAllByUserIdCompanyId(Long userId, Long companyId);

	PurchaseOrderDetailsEntity updateOrderDetails(Integer id, PurchaseOrderDetailsEntity updatedPurchaseOrder);

}
