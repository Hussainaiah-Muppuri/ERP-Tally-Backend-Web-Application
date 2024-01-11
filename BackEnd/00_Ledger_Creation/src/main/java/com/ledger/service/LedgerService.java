package com.ledger.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.ledger.entity.LedgerEntity;

public interface LedgerService {

	public ResponseEntity<String> saveLedger(LedgerEntity ledger);

	public LedgerEntity update(Long ledgerId, LedgerEntity updateLedger);

	public List<LedgerEntity> saveAll(List<LedgerEntity> ledgers);

	public Optional<LedgerEntity> getLedgerById(Long ledgerId);

	public String deleteByLedgerId(Long ledgerId);

	List<LedgerEntity> getAllLedgersByUserIdAndCompanyId(Long userId, Long companyId);

	public boolean isLedgerNameAndUnderGroupAlreadyExist(LedgerEntity ledger);

	public boolean isLedgerNameAndUnderGroupAlreadyExist(String ledgerName, String underGroup);

}
