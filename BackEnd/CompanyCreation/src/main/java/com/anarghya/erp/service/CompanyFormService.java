package com.anarghya.erp.service;

import java.util.List;

import com.anarghya.erp.LoginResponse.LoginMessage;
import com.anarghya.erp.entity.CompanyDTO;
import com.anarghya.erp.entity.CompanyForm;

public interface CompanyFormService 
{

    List<CompanyForm> getAllCompanies();

    CompanyForm getCompanyById(Long companyId);

	String createCompany(CompanyForm companyForm);

	String deleteCompany(Long companyId);

	String updateCompany(Long companyId, CompanyForm companyForm);

	List<CompanyForm> getAllCompaniesByUserId(Long userId);

	boolean validateCompanyPassword(Long companyId, String password);
	
	     //method to reset password
	LoginMessage resetPassword(CompanyDTO company);
		
		 //changing password by using otp
	LoginMessage password(CompanyDTO company);
		
}
