package com.ledger.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Entity
@Table(name = "ledger")
public class LedgerEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long ledgerId;
	
	@NotNull
	private String ledgerName;
	private String underGroup;
	private String date;
	
	 @NotNull
	@Column(unique = true)
	 private Long mobileNo;
	 
	 @NotNull
	private String email;
	private String address;
	private String bankAccountHolderName;
	
	@NotNull
	@Column(unique = true)
	private String bankAccountNo;
	
	@NotNull
	private String nameOfBank;
	
	@NotNull
	@Column(unique = true)
	private String ifscCode;
	@NotNull
	@Column(unique = true)
	private String gstNo;
	@NotNull
	@Column(unique = true)
	private String panNo;
	 @NotNull
	 @Column(unique = true)
	private String tanNo;
	 @NotNull
	 @Column(unique = true)
	private Long aadharNo;
	 
	private String effectStockLedger;
	private String currencyOfLedger;
	@Positive(message = "Balance must be a positive value")
	private double openningBalance;

	private Long userId;
	private Long companyId;

	public Long getLedgerId() {
		return ledgerId;
	}

	public void setLedgerId(Long ledgerId) {
		this.ledgerId = ledgerId;
	}

	public String getLedgerName() {
		return ledgerName;
	}

	public void setLedgerName(String ledgerName) {
		this.ledgerName = ledgerName;
	}

	public String getUnderGroup() {
		return underGroup;
	}

	public void setUnderGroup(String underGroup) {
		this.underGroup = underGroup;
	}

	public Long getMobileNo() {
		return mobileNo;
	}

	public void setMobileNo(Long mobileNo) {
		this.mobileNo = mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getBankAccountHolderName() {
		return bankAccountHolderName;
	}

	public void setBankAccountHolderName(String bankAccountHolderName) {
		this.bankAccountHolderName = bankAccountHolderName;
	}

	public String getBankAccountNo() {
		return bankAccountNo;
	}

	public void setBankAccountNo(String bankAccountNo) {
		this.bankAccountNo = bankAccountNo;
	}

	public String getNameOfBank() {
		return nameOfBank;
	}

	public void setNameOfBank(String nameOfBank) {
		this.nameOfBank = nameOfBank;
	}

	public String getIfscCode() {
		return ifscCode;
	}

	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}

	public String getGstNo() {
		return gstNo;
	}

	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}

	public String getPanNo() {
		return panNo;
	}

	public void setPanNo(String panNo) {
		this.panNo = panNo;
	}

	public String getTanNo() {
		return tanNo;
	}

	public void setTanNo(String tanNo) {
		this.tanNo = tanNo;
	}

	public Long getAadharNo() {
		return aadharNo;
	}

	public void setAadharNo(Long aadharNo) {
		this.aadharNo = aadharNo;
	}

	public String getEffectStockLedger() {
		return effectStockLedger;
	}

	public void setEffectStockLedger(String effectStockLedger) {
		this.effectStockLedger = effectStockLedger;
	}

	public String getCurrencyOfLedger() {
		return currencyOfLedger;
	}

	public void setCurrencyOfLedger(String currencyOfLedger) {
		this.currencyOfLedger = currencyOfLedger;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public double getOpenningBalance() {
		return openningBalance;
	}

	public void setOpenningBalance(double openningBalance) {
		this.openningBalance = openningBalance;
	}

	public LedgerEntity(Long ledgerId, String ledgerName, String underGroup, String date, Long mobileNo, String email,
			String address, String bankAccountHolderName, String bankAccountNo, String nameOfBank, String ifscCode,
			String gstNo, String panNo, String tanNo, Long aadharNo, String effectStockLedger, String currencyOfLedger,
			double openningBalance, Long userId, Long companyId) {
		this.ledgerId = ledgerId;
		this.ledgerName = ledgerName;
		this.underGroup = underGroup;
		this.date = date;
		this.mobileNo = mobileNo;
		this.email = email;
		this.address = address;
		this.bankAccountHolderName = bankAccountHolderName;
		this.bankAccountNo = bankAccountNo;
		this.nameOfBank = nameOfBank;
		this.ifscCode = ifscCode;
		this.gstNo = gstNo;
		this.panNo = panNo;
		this.tanNo = tanNo;
		this.aadharNo = aadharNo;
		this.effectStockLedger = effectStockLedger;
		this.currencyOfLedger = currencyOfLedger;
		this.openningBalance = openningBalance;
		this.userId = userId;
		this.companyId = companyId;
	}

	public LedgerEntity() {
	}

}