package com.anarghya.erp.entity;

public class CompanyPasswordRequest {
	private Long companyId;
	private String password;

	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public CompanyPasswordRequest(Long companyId, String password) {
		this.companyId = companyId;
		this.password = password;
	}

	public CompanyPasswordRequest() {
	}

}
