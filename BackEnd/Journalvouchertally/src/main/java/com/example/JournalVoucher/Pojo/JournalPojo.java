package com.example.JournalVoucher.Pojo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name="journalvoucher")
public class JournalPojo 
{
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long journalNo;
		
		private String date;
		private String day;
		private String selectTypeOfPayment;
		@NotNull
		private String particulars;
		@Positive(message="Amount Should be Positive Only")
		private Double debit;
		@Positive(message="Amount Should be Positive Only")
		private Double credit;
		private String description;
		@Positive(message="Amount Should be Positive Only")
		private Double debit1;
		@Positive(message="Amount Should be Positive Only")
		private Double credit1;
		private String selectTypeOfPayment1;
        @NotNull
		private String particulars1;
		@Positive(message="Amount Should be Positive Only")
		private String totalCredit;
		@Positive(message="Amount Should be Positive Only")
		private String totalDebit;
		
		private long companyId;
		private long userId;
		public Long getJournalNo() {
			return journalNo;
		}
		public void setJournalNo(Long journalNo) {
			this.journalNo = journalNo;
		}
		public String getDate() {
			return date;
		}
		public void setDate(String date) {
			this.date = date;
		}
		public String getDay() {
			return day;
		}
		public void setDay(String day) {
			this.day = day;
		}
		public String getSelectTypeOfPayment() {
			return selectTypeOfPayment;
		}
		public void setSelectTypeOfPayment(String selectTypeOfPayment) {
			this.selectTypeOfPayment = selectTypeOfPayment;
		}
		public String getParticulars() {
			return particulars;
		}
		public void setParticulars(String particulars) {
			this.particulars = particulars;
		}
		public Double getDebit() {
			return debit;
		}
		public void setDebit(Double debit) {
			this.debit = debit;
		}
		public Double getCredit() {
			return credit;
		}
		public void setCredit(Double credit) {
			this.credit = credit;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public Double getDebit1() {
			return debit1;
		}
		public void setDebit1(Double debit1) {
			this.debit1 = debit1;
		}
		public Double getCredit1() {
			return credit1;
		}
		public void setCredit1(Double credit1) {
			this.credit1 = credit1;
		}
		public String getSelectTypeOfPayment1() {
			return selectTypeOfPayment1;
		}
		public void setSelectTypeOfPayment1(String selectTypeOfPayment1) {
			this.selectTypeOfPayment1 = selectTypeOfPayment1;
		}
		public String getTotalCredit() {
			return totalCredit;
		}
		public void setTotalCredit(String totalCredit) {
			this.totalCredit = totalCredit;
		}
		public String getTotalDebit() {
			return totalDebit;
		}
		public void setTotalDebit(String totalDebit) {
			this.totalDebit = totalDebit;
		}
		public long getCompanyId() {
			return companyId;
		}
		public void setCompanyId(long companyId) {
			this.companyId = companyId;
		}
		public long getUserId() {
			return userId;
		}
		public void setUserId(long userId) {
			this.userId = userId;
		}
		public String getParticulars1() {
			return particulars1;
		}
		public void setParticulars1(String particulars1) {
			this.particulars1 = particulars1;
		}
		
		
		
		}