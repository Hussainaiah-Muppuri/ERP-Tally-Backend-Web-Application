package com.anarghya.erp.service.impl;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.anarghya.erp.LoginResponse.LoginMessage;
import com.anarghya.erp.entity.CompanyDTO;
import com.anarghya.erp.entity.CompanyForm;
import com.anarghya.erp.repository.CompanyFormRepository;
import com.anarghya.erp.service.CompanyFormService;

@Service
public class CompanyFormServiceImpl implements CompanyFormService {

	@Autowired
	private CompanyFormRepository companyFormRepository;

	@Autowired
	private JavaMailSender mailService;
	
	@Override
	public List<CompanyForm> getAllCompanies() {
		return companyFormRepository.findAll();
	}

	@Override
	public CompanyForm getCompanyById(Long companyId) {
		Optional<CompanyForm> companyOptional = companyFormRepository.findByCompanyId(companyId);
		return companyOptional.orElse(null);
	}

//	@Override
//	public String createCompany(CompanyForm companyForm) {
//		try {
//			companyFormRepository.save(companyForm);
//			return "Company created successfully!";
//		} catch (Exception e) {
//			e.printStackTrace(); // Log the exception for debugging purposes
//			return "Error creating company. Please try again.";
//		}
//	}

	@Override
	public String createCompany(CompanyForm companyForm) {
	    try {
	        // Check if email and mobile number are unique
	        if (isEmailAndMobileUnique(companyForm.getEmail(), companyForm.getMobileNo())) {
	            companyFormRepository.save(companyForm);
	            return "Company created successfully!";
	        } else {
	            return "Email and mobile number already exists. Please Provide Other Exist Values.";
	        }
	    } catch (Exception e) {
	        e.printStackTrace(); 
	        return "Error creating company. Please try again.";
	    }
	}

	// Method to check if email and mobile number are unique
	private boolean isEmailAndMobileUnique(String email, Long mobileNo) {
	    // Check if the email or mobile number already exists in the database
	  	    return !companyFormRepository.existsByEmail(email) && !companyFormRepository.existsByMobileNo(mobileNo);
	}

	
	@Override
	public String updateCompany(Long companyId, CompanyForm updatedCompanyForm) {
		Optional<CompanyForm> existingCompanyOptional = companyFormRepository.findByCompanyId(companyId);

		if (existingCompanyOptional.isPresent()) {
			CompanyForm existingCompany = existingCompanyOptional.get();

			existingCompany.setCompanyName(updatedCompanyForm.getCompanyName());
			existingCompany.setAddress(updatedCompanyForm.getAddress());
			existingCompany.setCountry(updatedCompanyForm.getCountry());
			existingCompany.setState(updatedCompanyForm.getState());
			existingCompany.setPincode(updatedCompanyForm.getPincode());
			existingCompany.setMobileNo(updatedCompanyForm.getMobileNo());
			existingCompany.setEmail(updatedCompanyForm.getEmail());
			existingCompany.setCurrencySymbol(updatedCompanyForm.getCurrencySymbol());
			existingCompany.setMaintain(updatedCompanyForm.getMaintain());
			existingCompany.setPassword(updatedCompanyForm.getPassword());
			existingCompany.setFinancialYearFrom(updatedCompanyForm.getFinancialYearFrom());
			existingCompany.setBooksBeginningFrom(updatedCompanyForm.getBooksBeginningFrom());
			existingCompany.setBaseCurrencySymbol(updatedCompanyForm.getBaseCurrencySymbol());
			existingCompany.setFormalName(updatedCompanyForm.getFormalName());
			existingCompany.setNumberOfDecimalPlaces(updatedCompanyForm.getNumberOfDecimalPlaces());
			existingCompany.setIsSymbolSuffixedToAmounts(updatedCompanyForm.getIsSymbolSuffixedToAmounts());
			companyFormRepository.save(existingCompany);

			return "Company updated successfully!";
		} else {
			return "Company not found!";
		}
	}

	@Override
	public String deleteCompany(Long companyId) {
		if (companyFormRepository.existsById(companyId)) {
			companyFormRepository.deleteById(companyId);
			return "Company deleted successfully!";
		} else {
			return "Company not found!";
		}
	}

	public List<CompanyForm> getAllCompaniesByUserId(Long userId) {
		return companyFormRepository.findByUserId(userId);
	}

	public boolean validateCompanyPassword(Long companyId, String password) {
		CompanyForm company = companyFormRepository.findById(companyId)
				.orElseThrow(() -> new RuntimeException("Company not found"));

		// Compare the provided password with the stored password (you might want to use
		// a password hashing library)
		return password.equals(company.getPassword());
	}

	String otp;
	 Long id;
	 CompanyForm cm;
	 @Override
	 public LoginMessage resetPassword(CompanyDTO company) throws MailException { 
		 
		 CompanyForm mail1;
			mail1 = companyFormRepository.findByEmail(company.getEmail());
			
		   if(mail1 != null) {
			   String mail = mail1.getEmail();
			   String m =company.getEmail();
			   
		  if(mail.equals(m)) 
		    {  
			  SimpleMailMessage message = new SimpleMailMessage();
			  message.setFrom("muppuri47@gmail.com");
				message.setTo(mail);
				message.setSubject("Password Reset Request for Your Company ERP Accounts ");
				Random random =  new Random();
				 otp =(Integer.toString( random.nextInt(999999)));
				 String body= " Greetings for the day! You have requested a password reset for your ERP Company Account.\r\n"
				 		+ "\r\n"
				 		+ "To complete the password reset process, please enter the following One Time Password (OTP) : "+otp+"\r\n"
				 		+ "\r\n"
				 		+ "Remember, this OTP is confidential, and it should not be shared with Anyone.\r\n"
				 		+ "\r\n"
				 		+ "Thank you for choosing ERP Tally.\r\n"
				 		+ "\r\n"
				 		+ "Best regards,\r\n"
				 		+ "ERP Tally Support Team\r\n";
				 		message.setText(body);
			   mailService.send(message);
				   id = mail1.getCompanyId();
			   return new LoginMessage("OTP Send to E-Mail check it Once",true);
		  }
		  else {
			  return new LoginMessage("E-Mail Entered Not Matched With Data-Base E-mails Plz Try Again ",false);
		  }
		   }
		   else {
			   return new LoginMessage("E-Mail is Not Exist Plz Try Again ",false);
		   }
	  }
	 
	 //method to change password by using OTP
		
	 @Override
	  public LoginMessage password(CompanyDTO company) {
		  
		  if(company.getOtp().equals(otp)) {
			  CompanyForm mail1 = companyFormRepository.findByEmail(company.getEmail());
			  
			  
			  Optional<CompanyForm> model = companyFormRepository.findByCompanyId(id);
			  CompanyForm models = model.get();
			  String mail2 =models.getEmail();	
			  
//			  If You Need Encrytpted Password in DataBase then Use this.  
//			  
//			  java.util.Base64.Encoder  encoder= Base64.getEncoder();
//			  String encodepassword=encoder.encodeToString(company.getPassword().getBytes());
//			  models.setPassword(encodepassword);
//			  companyFormRepository.save(models);
//			  
			  models.setPassword(company.getPassword());;
			  companyFormRepository.save(models);
			   
			   
				  SimpleMailMessage message = new SimpleMailMessage();
					message.setTo(mail2);
					message.setSubject("Welcome to ERP Tally Website \r\n");
					Random random =  new Random();
					int atIndex = mail2.indexOf('@');
					 String username = mail2.substring(0, atIndex);
					 
	String body= "Welcome to ERP Tally! We're excited to have you on board. Your new password for "+ username +" is: "+company.getPassword()+".\r\n"
			+ "\r\n"
			+ "Please use this password to log in to your account. Remember to keep it confidential and avoid sharing it with anyone.\r\n"
			+ "\r\n"
			+ "If you have any questions or need assistance, feel free to reach out to our support team.\r\n"
			+ "\r\n"
			+ "Thank you for choosing ERP Tally!\r\n"
			+ "\r\n"
			+ "Best regards,\r\n"
			+ "ERP Tally Support Team";			
					 message.setText(body);
				   mailService.send(message);
				   
			  return  new LoginMessage("Password Reset For Company Successfully",true);
		  }
		  else {
			  return new LoginMessage("OTP is Incorrect  ",false);
		  }
    }
}