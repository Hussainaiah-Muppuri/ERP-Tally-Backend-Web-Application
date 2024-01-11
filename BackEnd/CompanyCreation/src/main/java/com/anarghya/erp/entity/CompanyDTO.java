package com.anarghya.erp.entity;

public class CompanyDTO {

	private String email;
	private String otp;
	private String password;

	public CompanyDTO() {
	}

	public CompanyDTO(String email, String otp, String password) {
		super();
		this.email = email;
		this.otp = otp;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}