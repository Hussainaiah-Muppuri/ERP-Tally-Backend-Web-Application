package com.erp.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.entity.SalesOrderEntity;
import com.erp.repository.SalesOrderRepo;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class SalesOrderServiceImpl implements SalesOrderService {

	@Autowired
	private SalesOrderRepo salesRepo;

	@Override
	public List<SalesOrderEntity> saveAll(List<SalesOrderEntity> sales) {
		return salesRepo.saveAll(sales);
	}

	@Override
	public SalesOrderEntity getById(Long salesOrderNo) {
		Optional<SalesOrderEntity> findById = salesRepo.findBySalesOrderNo(salesOrderNo);
		if (findById.isPresent()) {
			return findById.get();
		}

		return null;
	}

	@Override
	public String deleteBySalesOrder(Long salesOrderNo) {
		if (salesRepo.existsBySalesOrderNo(salesOrderNo)) {
			salesRepo.deleteById(salesOrderNo);
			return "delete success";
		}
		return "no records found";
	}

	@Override
	public String save(SalesOrderEntity sales) {
		salesRepo.save(sales);
		return "saved";

	}

	public String update(Long salesOrderNo, SalesOrderEntity updatedSalesOrder) {
		// Find the existing sales order by sales order number
		Optional<SalesOrderEntity> existingSalesOptional = salesRepo.findBySalesOrderNo(salesOrderNo);

		if (existingSalesOptional.isPresent()) {
			// Retrieve the existing sales order from the optional
			SalesOrderEntity existingSales = existingSalesOptional.get();

			// Update the fields of the existing sales order with the values from the
			// updatedSalesOrder
			existingSales.setOrderNo(updatedSalesOrder.getOrderNo());
			existingSales.setDate(updatedSalesOrder.getDate());
			existingSales.setDay(updatedSalesOrder.getDay());
			existingSales.setPartyName(updatedSalesOrder.getPartyName());
			existingSales.setCurrentBalance(updatedSalesOrder.getCurrentBalance());
			existingSales.setItemName(updatedSalesOrder.getItemName());
			existingSales.setQuantity(updatedSalesOrder.getQuantity());
			existingSales.setUnit(updatedSalesOrder.getUnit());
			existingSales.setRate(updatedSalesOrder.getRate());
			existingSales.setDiscount(updatedSalesOrder.getDiscount());
			existingSales.setAmount(updatedSalesOrder.getAmount());
			existingSales.setTotalAmount(updatedSalesOrder.getTotalAmount());
			existingSales.setDescription(updatedSalesOrder.getDescription());
			existingSales.setUserId(updatedSalesOrder.getUserId());
			existingSales.setCompanyId(updatedSalesOrder.getCompanyId());

			// Save the updated sales order back to the repository
			salesRepo.save(existingSales);

			return "Sales order updated successfully!";
		} else {
			return "Sales order not found!";
		}
	}

	@Override
	public List<SalesOrderEntity> getAllSalesOrdersByUserIdAndCompanyId(Long userId, Long companyId) {
		return salesRepo.findByUserIdAndCompanyId(userId, companyId);
	}

	@Override
	public Optional<SalesOrderEntity> getSalesOrderByOrderNo(String orderNo) {
		return salesRepo.findByOrderNo(orderNo);
	}

}