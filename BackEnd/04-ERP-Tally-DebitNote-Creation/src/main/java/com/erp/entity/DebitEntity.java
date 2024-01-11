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

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name = "DEBIT_NOTE")
public class DebitEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long debitId;

	private String orderNo;
	@NotNull
	private String partyName;
	@Positive(message="Amount Must be Positive")
	private Long currentBalance;
	private String itemName;
	private String quantity;
	@Positive(message="Amount Must be Positive")
	private Double rate;
	private String unit;
	private String discount;
	@Positive(message="Amount Must be Positive")
	private Long amount;
	@Positive(message="Amount Must be Positive")
	private Double totalAmount;
	private String description;

	@CreationTimestamp
	private LocalDate date;

	private String day;
	private Long userId;
	private Long companyId;

	public Long getDebitId() {
		return debitId;
	}

	public void setDebitId(Long debitId) {
		this.debitId = debitId;
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

	public Long getCurrentBalance() {
		return currentBalance;
	}

	public void setCurrentBalance(Long currentBalance) {
		this.currentBalance = currentBalance;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
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

	public String getDiscount() {
		return discount;
	}

	public void setDiscount(String discount) {
		this.discount = discount;
	}

	public Long getAmount() {
		return amount;
	}

	public void setAmount(Long amount) {
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

	public DebitEntity(Long debitId, String orderNo, String partyName, Long currentBalance, String itemName,
			String quantity, Double rate, String unit, String discount, Long amount, Double totalAmount,
			String description, LocalDate date, String day, Long userId, Long companyId) {
		this.debitId = debitId;
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

	public DebitEntity() {
	}

}
