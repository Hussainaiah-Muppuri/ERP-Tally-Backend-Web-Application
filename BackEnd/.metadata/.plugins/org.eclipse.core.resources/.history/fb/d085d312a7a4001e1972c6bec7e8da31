package com.stockitem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="items")
public class StockItemEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long stockItemId;
	private String stockItemName;
	private String underStockGroup;
	private String unit;
	private Integer quantity;
	private Double openingBalance;
	
	private Long userId;
	private Long companyId;
	
	
	
	
}
