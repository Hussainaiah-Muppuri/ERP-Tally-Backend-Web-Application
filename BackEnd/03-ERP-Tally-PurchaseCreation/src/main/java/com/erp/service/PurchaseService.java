package com.erp.service;

import java.util.List;
import java.util.Optional;

import com.erp.entity.PurchaseEntity;

public interface PurchaseService {

	public Boolean saveOrder(PurchaseEntity entity);

	public List<PurchaseEntity> saveAllOrder(List<PurchaseEntity> entities);

	public Optional<PurchaseEntity> getById(Long purchaseId);

	public String deleteOrderById(Long purchaseId);

	public PurchaseEntity updateOrderDetails(PurchaseEntity orderEntities, Long purchaseId);

	List<PurchaseEntity> getAllByUserIdCompanyId(Long userId, Long companyId);

}