package com.anarghya.erp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.anarghya.erp.LoginResponse.LoginMessage;
import com.anarghya.erp.entity.CompanyDTO;
import com.anarghya.erp.entity.CompanyForm;
import com.anarghya.erp.entity.CompanyPasswordRequest;
import com.anarghya.erp.entity.ErrorResponse;
import com.anarghya.erp.entity.ValidationResponse;
import com.anarghya.erp.service.CompanyFormService;


@CrossOrigin("*")
@RestController
@RequestMapping("/company")
public class CompanyFormController {

	@Autowired
	private CompanyFormService companyFormService;

	@GetMapping
	public ResponseEntity<List<CompanyForm>> getAllCompanies() {
		List<CompanyForm> companies = companyFormService.getAllCompanies();
		return new ResponseEntity<>(companies, HttpStatus.OK);
	}

	@GetMapping("/{companyId}")
	public ResponseEntity<CompanyForm> getCompanyById(@PathVariable Long companyId) {
		CompanyForm company = companyFormService.getCompanyById(companyId);
		return new ResponseEntity<>(company, company != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
	}

	@PostMapping
	public ResponseEntity<String> createCompany(@RequestBody CompanyForm companyForm) {
		String status = companyFormService.createCompany(companyForm);
		return new ResponseEntity<>(status, HttpStatus.CREATED);
	}

	@PutMapping("/{companyId}")
	public ResponseEntity<String> updateCompany(@PathVariable Long companyId, @RequestBody CompanyForm companyForm) {
		String result = companyFormService.updateCompany(companyId, companyForm);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/{companyId}")
	public ResponseEntity<String> deleteCompany(@PathVariable Long companyId) {
		String status = companyFormService.deleteCompany(companyId);
		return new ResponseEntity<>(status, HttpStatus.OK);
	}

	@GetMapping("/user/{userId}")
	public List<CompanyForm> getAllCompaniesByUserId(@PathVariable Long userId) {
		return companyFormService.getAllCompaniesByUserId(userId);
	}

	@PostMapping("/validate-password")
	public ResponseEntity<?> validateCompanyPassword(@RequestBody CompanyPasswordRequest request) {
		try {
			boolean isValid = companyFormService.validateCompanyPassword(request.getCompanyId(), request.getPassword());
			return ResponseEntity.ok(new ValidationResponse(isValid));
		} catch (Exception e) {
			return ResponseEntity.status(500).body(new ErrorResponse("Internal server error"));
		}
	}
	
	@PostMapping("/reset")
	public LoginMessage resetPassword(@RequestBody CompanyDTO companyDto) {
		LoginMessage message = companyFormService.resetPassword(companyDto);
		return message;
	}

	@PutMapping("/password")
	public LoginMessage password(@RequestBody CompanyDTO companyDto) {
		LoginMessage msg = companyFormService.password(companyDto);
		return msg;

	}
}