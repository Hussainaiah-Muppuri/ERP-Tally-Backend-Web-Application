package com.anarghya.erp.entity;

public class ValidationResponse {
	private boolean success;

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public ValidationResponse(boolean success) {
		this.success = success;
	}

	public ValidationResponse() {
	}

}
