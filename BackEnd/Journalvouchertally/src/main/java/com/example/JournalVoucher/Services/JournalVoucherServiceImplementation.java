package com.example.JournalVoucher.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.JournalVoucher.Pojo.JournalPojo;
import com.example.JournalVoucher.Repository.JournalVoucherRepository;

@Service
public class JournalVoucherServiceImplementation implements JournalVoucherService
{

	 @Autowired
	    private JournalVoucherRepository repo;

	    @Override
	    public Optional<JournalPojo> getJournalById(Long journalNo) {
	        return repo.findById(journalNo);
	    }

	    @Override
	    public ResponseEntity<String> addJournal(JournalPojo journal) {
//	        if (receiptrepo.findByParticulars(receipt.getParticulars()) != null)
//	            return ResponseEntity.badRequest().body("Journal Voucher is already present.");
	//
	        repo.save(journal);
	        return ResponseEntity.ok("Journal Voucher added Successfully");
	    }

	    @Override
	    public List<String> addMultipleJournal(List<JournalPojo> journalpojo) {
	        List<String> results = new ArrayList<>();
	        for (JournalPojo pojo : journalpojo) {
	            results.add(addJournal(pojo).getBody());
	        }
	        return results;
	    }

	    @Override
	    public String deleteJournal(Long journalNo) {
	               repo.deleteById(journalNo);
	        return "Deleted Successfully ";
	    }

	    @Override
	    public JournalPojo updateJournal(Long journalNo, JournalPojo updatedJournal) {
	        updatedJournal.setJournalNo(journalNo);
	        return repo.save(updatedJournal);
	    }

	    @Override
	    public List<JournalPojo> getAlljournal() {
	        return repo.findAll();
	    }

//	    @Override
//	    public Optional<JournalPojo> getJournalByUserIdAndCompanyId(Long userId, Long companyId) {
//	        Optional<JournalPojo> journal = repo.findByUserIdAndCompanyId(userId, companyId);
//	        return journal;
//	    }
	    @Override
	    public List<JournalPojo> getJournalVoucherByUserIdAndCompanyId(long userId, long companyId) {
	        return repo.findByUserIdAndCompanyId(userId, companyId);
	    }

}