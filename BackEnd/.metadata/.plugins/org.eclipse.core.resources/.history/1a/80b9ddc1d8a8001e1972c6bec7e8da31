package com.erp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.binding.purchaseOrderResponse;
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
	public purchaseOrderResponse getById(Integer id) {
		purchaseOrderResponse response = new purchaseOrderResponse();
		Optional<PurchaseOrderDetailsEntity> findById = purchaseOrderRepo.findById(id);
		if (findById.isPresent()) {
			PurchaseOrderDetailsEntity entity = findById.get();
			BeanUtils.copyProperties(entity, response);

			Double productPrice = entity.getAmount();
			Double discount = entity.getDiscount();
			Long quantity = entity.getQuantity();
			Double discountPrice = ((productPrice * discount) / 100) * quantity;
			response.setDiscount(discountPrice);
			response.setAmount((productPrice * quantity) - discountPrice);
			return response;
		}
		return null;
	}

	@Override
	public String deleteOrderById(Integer id) {
		purchaseOrderRepo.deleteById(id);
		return "deleted order";
	}

	@Override
	public PurchaseOrderDetailsEntity updateOrderDetails(PurchaseOrderDetailsEntity orderEntities) {
		PurchaseOrderDetailsEntity entity = purchaseOrderRepo.findById(orderEntities.getPurchaseOrderId()).get();
		BeanUtils.copyProperties(orderEntities, entity);
		PurchaseOrderDetailsEntity save = purchaseOrderRepo.save(entity);
		return save;
	}

}
