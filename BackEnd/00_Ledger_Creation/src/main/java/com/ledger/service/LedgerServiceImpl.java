package com.ledger.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ledger.entity.LedgerEntity;
import com.ledger.repo.LedgerRepository;

@Service
public class LedgerServiceImpl implements LedgerService 
{
	@Autowired
	private LedgerRepository ledgerRepo;

	@Override
	public ResponseEntity<String> saveLedger(LedgerEntity ledger) {
		ledgerRepo.save(ledger);
		return ResponseEntity.ok("Ledger Name Saved Successfully");
	}
	
	public boolean isLedgerNameAndUnderGroupAlreadyExist(LedgerEntity ledger) {
	    Optional<LedgerEntity> existingLedger = ledgerRepo.findByLedgerNameAndUnderGroup(ledger.getLedgerName(), ledger.getUnderGroup());
	    return existingLedger.isPresent();
	}

	@Override
	public LedgerEntity update(Long ledgerId, LedgerEntity updateLedger) {
		updateLedger.setLedgerId(ledgerId);
		return ledgerRepo.save(updateLedger);

	}

//	@Override
//	public List<LedgerEntity> saveAll(List<LedgerEntity> ledgers) {
//		return ledgerRepo.saveAll(ledgers);
//	}
	
    @Override
    public List<LedgerEntity> saveAll(List<LedgerEntity> ledgers) {
        List<LedgerEntity> results = new ArrayList<>();

        for (LedgerEntity ledger : ledgers) {
            if (!isLedgerAlreadyExists(ledger)) {
                LedgerEntity savedLedger = ledgerRepo.save(ledger);
                results.add(savedLedger);
            } 
        }
        return results;
    }
    
      private boolean isLedgerAlreadyExists(LedgerEntity ledger) {
        Optional<LedgerEntity> existingLedger = ledgerRepo.findByLedgerNameAndUnderGroup(
                ledger.getLedgerName(), ledger.getUnderGroup());
              return existingLedger.isPresent();
         }

	@Override
	public Optional<LedgerEntity> getLedgerById(Long ledgerId) {
		return ledgerRepo.findById(ledgerId);
	}

	@Override
	public String deleteByLedgerId(Long ledgerId) {
		ledgerRepo.deleteById(ledgerId);
		return "deleted";
	}

	@Override
	public List<LedgerEntity> getAllLedgersByUserIdAndCompanyId(Long userId, Long companyId) {
		return ledgerRepo.getAllEntities(userId, companyId);
	}

	@Override
	public boolean isLedgerNameAndUnderGroupAlreadyExist(String ledgerName, String underGroup) {
	
		return false;
	}
}