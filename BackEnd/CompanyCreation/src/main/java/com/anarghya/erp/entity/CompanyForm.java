package com.anarghya.erp.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
@Entity
@Table(name = "company")
public class CompanyForm {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long companyId;
	@Column(unique = true)
	private String companyName;
	private String address;
	private String Country;
	private String state;
	
	private Long pincode;
	@Column(unique = true)
	private Long mobileNo;

	@Column(unique = true)
	private String email;
	private String currencySymbol;
	private String maintain;
	private LocalDate financialYearFrom;
	private LocalDate booksBeginningFrom;
	private String Password;

	private String baseCurrencySymbol;
	private String formalName;
	@Positive(message="Value Must be Positive")
	private Integer numberOfDecimalPlaces;
	private String isSymbolSuffixedToAmounts;
	
	private Long userId;

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCountry() {
		return Country;
	}

	public void setCountry(String country) {
		Country = country;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Long getPincode() {
		return pincode;
	}

	public void setPincode(Long pincode) {
		this.pincode = pincode;
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

	public String getCurrencySymbol() {
		return currencySymbol;
	}

	public void setCurrencySymbol(String currencySymbol) {
		this.currencySymbol = currencySymbol;
	}

	public String getMaintain() {
		return maintain;
	}

	public void setMaintain(String maintain) {
		this.maintain = maintain;
	}

	public LocalDate getFinancialYearFrom() {
		return financialYearFrom;
	}

	public void setFinancialYearFrom(LocalDate financialYearFrom) {
		this.financialYearFrom = financialYearFrom;
	}

	public LocalDate getBooksBeginningFrom() {
		return booksBeginningFrom;
	}

	public void setBooksBeginningFrom(LocalDate booksBeginningFrom) {
		this.booksBeginningFrom = booksBeginningFrom;
	}

	public String getPassword() {
		return Password;
	}

	public void setPassword(String password) {
		Password = password;
	}

	public String getBaseCurrencySymbol() {
		return baseCurrencySymbol;
	}

	public void setBaseCurrencySymbol(String baseCurrencySymbol) {
		this.baseCurrencySymbol = baseCurrencySymbol;
	}

	public String getFormalName() {
		return formalName;
	}

	public void setFormalName(String formalName) {
		this.formalName = formalName;
	}

	public Integer getNumberOfDecimalPlaces() {
		return numberOfDecimalPlaces;
	}

	public void setNumberOfDecimalPlaces(Integer numberOfDecimalPlaces) {
		this.numberOfDecimalPlaces = numberOfDecimalPlaces;
	}

	public String getIsSymbolSuffixedToAmounts() {
		return isSymbolSuffixedToAmounts;
	}

	public void setIsSymbolSuffixedToAmounts(String isSymbolSuffixedToAmounts) {
		this.isSymbolSuffixedToAmounts = isSymbolSuffixedToAmounts;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public CompanyForm(Long companyId, String companyName, String address, String country, String state,
			Long pincode, Long mobileNo, String email, String currencySymbol, String maintain,
			LocalDate financialYearFrom, LocalDate booksBeginningFrom, String password, String baseCurrencySymbol,
			String formalName, Integer numberOfDecimalPlaces, String isSymbolSuffixedToAmounts, Long userId) {
		this.companyId = companyId;
		this.companyName = companyName;
		this.address = address;
		Country = country;
		this.state = state;
		this.pincode = pincode;
		this.mobileNo = mobileNo;
		this.email = email;
		this.currencySymbol = currencySymbol;
		this.maintain = maintain;
		this.financialYearFrom = financialYearFrom;
		this.booksBeginningFrom = booksBeginningFrom;
		Password = password;
		this.baseCurrencySymbol = baseCurrencySymbol;
		this.formalName = formalName;
		this.numberOfDecimalPlaces = numberOfDecimalPlaces;
		this.isSymbolSuffixedToAmounts = isSymbolSuffixedToAmounts;
		this.userId = userId;
	}

	public CompanyForm() {
	}

}