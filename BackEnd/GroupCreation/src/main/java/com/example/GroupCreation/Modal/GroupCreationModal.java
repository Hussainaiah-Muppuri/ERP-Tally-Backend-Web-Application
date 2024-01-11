package com.example.GroupCreation.Modal;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="groupcreation")
public class GroupCreationModal 
{
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
   private Long groupId;
   
   @NotBlank(message = "Please enter proper firstName name")
	@Size(min = 3, message = "firstName should be atleast 3 characters")
	@Size(max = 15, message = "firstName should not be greater than 15 characters")
    @NotNull
  	@Column(unique = true)
   private String groupName;
   private String under;
   
   private Long userId;
   private Long companyId;
   
   
public Long getGroupId() {
	return groupId;
}
public void setGroupId(Long groupId) {
	this.groupId = groupId;
}
public String getGroupName() {
	return groupName;
}
public void setGroupName(String groupName) {
	this.groupName = groupName;
}
public String getUnder() {
	return under;
}
public void setUnder(String under) {
	this.under = under;
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
}