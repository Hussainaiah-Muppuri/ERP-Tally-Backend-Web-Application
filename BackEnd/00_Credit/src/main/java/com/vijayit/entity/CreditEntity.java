package com.vijayit.entity;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "CREDIT")
public class CreditEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@JsonProperty
	private Long creditNo;
	private Long salesOrderNo;
	private String orderNo;
	private String date;
	private String day;
	@NotNull
	private String partyName;
	@Positive(message = "Value must be Positive")
	private Double currentBalance;
	private String itemName;
	@Positive(message="Value Must be Positve")
	private Integer quantity;
	private String unit;
	@Positive(message = "Value must be Positive")
	private Double rate;
	private Double discount;
	@Positive(message = "Value must be Positive")
	private Double amount;
	@Positive(message = "Value must be Positive")
	private Double totalAmount;
	private String description;

	private Long userId;
	private Long companyId;

	public Long getCreditNo() {
		return creditNo;
	}

	public void setCreditNo(Long creditNo) {
		this.creditNo = creditNo;
	}

	public Long getSalesOrderNo() {
		return salesOrderNo;
	}

	public void setSalesOrderNo(Long salesOrderNo) {
		this.salesOrderNo = salesOrderNo;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
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

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
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

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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

	public CreditEntity(Long creditNo, Long salesOrderNo, String orderNo, String date, String day, String partyName,
			Double currentBalance, String itemName, Integer quantity, String unit, Double rate, Double discount,
			Double amount, Double totalAmount, String description, Long userId, Long companyId) {
		this.creditNo = creditNo;
		this.salesOrderNo = salesOrderNo;
		this.orderNo = orderNo;
		this.date = date;
		this.day = day;
		this.partyName = partyName;
		this.currentBalance = currentBalance;
		this.itemName = itemName;
		this.quantity = quantity;
		this.unit = unit;
		this.rate = rate;
		this.discount = discount;
		this.amount = amount;
		this.totalAmount = totalAmount;
		this.description = description;
		this.userId = userId;
		this.companyId = companyId;
	}

	public CreditEntity() {
	}

}
