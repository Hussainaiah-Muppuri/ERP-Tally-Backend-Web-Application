package com.stock.entity;

import javax.validation.constraints.NotNull;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "STOCK")
public class StockGroupEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long stockGroupId;
	@NotNull
	private String stockGroupName;

	private Long userId;
	private Long companyId;

	public Long getStockGroupId() {
		return stockGroupId;
	}

	public void setStockGroupId(Long stockGroupId) {
		this.stockGroupId = stockGroupId;
	}

	public String getStockGroupName() {
		return stockGroupName;
	}

	public void setStockGroupName(String stockGroupName) {
		this.stockGroupName = stockGroupName;
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

	public StockGroupEntity(Long stockGroupId, String stockGroupName, Long userId, Long companyId) {
		this.stockGroupId = stockGroupId;
		this.stockGroupName = stockGroupName;
		this.userId = userId;
		this.companyId = companyId;
	}

	public StockGroupEntity() {
	}
}