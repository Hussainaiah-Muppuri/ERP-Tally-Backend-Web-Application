package com.anarghya.erp.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "units")
public class UnitEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long unitId;
	@NotNull
	@Column(unique = true)
	private String unitSymbol;
	private String formalName;
	private Long userId;
	private Long companyId;

	public Long getUnitId() {
		return unitId;
	}

	public void setUnitId(Long unitId) {
		this.unitId = unitId;
	}

	public String getUnitSymbol() {
		return unitSymbol;
	}

	public void setUnitSymbol(String unitSymbol) {
		this.unitSymbol = unitSymbol;
	}

	public String getFormalName() {
		return formalName;
	}

	public void setFormalName(String formalName) {
		this.formalName = formalName;
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

	public UnitEntity(Long unitId, String unitSymbol, String formalName, Long userId, Long companyId) {
		this.unitId = unitId;
		this.unitSymbol = unitSymbol;
		this.formalName = formalName;
		this.userId = userId;
		this.companyId = companyId;
	}

	public UnitEntity() {
	}
}
