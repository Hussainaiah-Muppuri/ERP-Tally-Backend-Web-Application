package com.example.JournalVoucher.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.JournalVoucher.Pojo.JournalPojo;


public interface JournalVoucherService 
{
	ResponseEntity<String> addJournal(JournalPojo journalpojo);

    List<String> addMultipleJournal(List<JournalPojo> journalpojo);

    Optional<JournalPojo> getJournalById(Long journalNo);

    JournalPojo updateJournal(Long journalNo, JournalPojo updatedjournalpojo);

    String deleteJournal(Long journalNo);

    List<JournalPojo> getAlljournal();

    public List<JournalPojo> getJournalVoucherByUserIdAndCompanyId(long userId, long companyId);
    
}
