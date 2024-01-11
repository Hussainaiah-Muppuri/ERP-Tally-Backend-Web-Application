package com.erp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.entity.PurchaseOrderDetailsEntity;
import com.erp.repository.PurchaseOrderDetailsRepo;
import com.erp.service.PurchaseOrderDetailsService;

@Service
public class PurchaseOrderDetailsServiceImpl implements PurchaseOrderDetailsService {

	@Autowired
	private PurchaseOrderDetailsRepo purchaseOrderRepo;

	@Override
	public Boolean saveOrder(PurchaseOrderDetailsEntity entity) {

		purchaseOrderRepo.save(entity);

		return true;
	}

	@Override
	public List<PurchaseOrderDetailsEntity> saveAllOrder(List<PurchaseOrderDetailsEntity> entities) {
		return purchaseOrderRepo.saveAll(entities);
	}

	@Override
	public Optional<PurchaseOrderDetailsEntity> getById(Integer id) {
		return purchaseOrderRepo.findById(id);
	}

	@Override
	public String deleteOrderById(Integer id) {
		purchaseOrderRepo.deleteById(id);
		return "deleted order";
	}

	@Override
	public PurchaseOrderDetailsEntity updateOrderDetails(Integer id, PurchaseOrderDetailsEntity updatedPurchaseOrder) {
		if (purchaseOrderRepo.existsById(id)) {
			updatedPurchaseOrder.setPurchaseOrderId(id);
			return purchaseOrderRepo.save(updatedPurchaseOrder);
		}
		return null; // Handle not found scenario
	}

	@Override
	public List<PurchaseOrderDetailsEntity> getAllByUserIdCompanyId(Long userId, Long companyId) {
		return purchaseOrderRepo.findByUserIdAndCompanyId(userId, companyId);
	}

}
