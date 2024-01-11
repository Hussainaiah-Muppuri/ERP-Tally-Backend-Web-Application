package com.erp.entity;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Table(name = "PURCHASE")
public class PurchaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long purchaseId;

	private String orderNo;

	@NotNull
	private String partyName;
  
	@Positive(message="Value Must Be Positive")
	private Double currentBalance;

	private String itemName;

	@Positive(message="Value Must Be Positive")
	private Long quantity;
	@Positive(message="Value Must Be Positive")
	private Double rate;

	private String unit;
	@Positive(message="Value Must Be Positive")
	private Double discount;

	@Positive(message="Amount Must Be Positive")
	private Double amount;
	@Positive(message="Amount Must Be Positive")
	private Double totalAmount;

	private String description;

	@CreationTimestamp
	private LocalDate date;

	private String day;

	private Long userId;

	private Long companyId;

	public Long getPurchaseId() {
		return purchaseId;
	}

	public void setPurchaseId(Long purchaseId) {
		this.purchaseId = purchaseId;
	}

	public PurchaseEntity() {
	}

	public PurchaseEntity(Long purchaseId, String orderNo, String partyName, Double currentBalance, String itemName,
			Long quantity, Double rate, String unit, Double discount, Double amount, Double totalAmount,
			String description, LocalDate date, String day, Long userId, Long companyId) {
		this.purchaseId = purchaseId;
		this.orderNo = orderNo;
		this.partyName = partyName;
		this.currentBalance = currentBalance;
		this.itemName = itemName;
		this.quantity = quantity;
		this.rate = rate;
		this.unit = unit;
		this.discount = discount;
		this.amount = amount;
		this.totalAmount = totalAmount;
		this.description = description;
		this.date = date;
		this.day = day;
		this.userId = userId;
		this.companyId = companyId;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getPartyName() {
		return partyName;
	}

	public void setPartyName(String partyName) {
		this.partyName = partyName;
	}

	public Double getCurrentBalance() {
		return currentBalance;
	}

	public void setCurrentBalance(Double currentBalance) {
		this.currentBalance = currentBalance;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

}
