package com.stockitem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "items")
public class StockItemEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long stockItemId;
	
	@Column(unique=true)
	private String stockItemName;
	
	private String underStockGroup;
	private String unit;
	private Integer quantity;
	private Double openingBalance;

	private Long userId;
	private Long companyId;

	public Long getStockItemId() {
		return stockItemId;
	}

	public void setStockItemId(Long stockItemId) {
		this.stockItemId = stockItemId;
	}

	public String getStockItemName() {
		return stockItemName;
	}

	public void setStockItemName(String stockItemName) {
		this.stockItemName = stockItemName;
	}

	public String getUnderStockGroup() {
		return underStockGroup;
	}

	public void setUnderStockGroup(String underStockGroup) {
		this.underStockGroup = underStockGroup;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Double getOpeningBalance() {
		return openingBalance;
	}

	public void setOpeningBalance(Double openingBalance) {
		this.openingBalance = openingBalance;
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

	public StockItemEntity(Long stockItemId, String stockItemName, String underStockGroup, String unit,
			Integer quantity, Double openingBalance, Long userId, Long companyId) {
		this.stockItemId = stockItemId;
		this.stockItemName = stockItemName;
		this.underStockGroup = underStockGroup;
		this.unit = unit;
		this.quantity = quantity;
		this.openingBalance = openingBalance;
		this.userId = userId;
		this.companyId = companyId;
	}

	public StockItemEntity() {
	}

}