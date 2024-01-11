package com.ledger.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ledger.entity.LedgerEntity;

public interface LedgerRepository extends JpaRepository<LedgerEntity, Long> {

	public Optional<LedgerEntity> findById(Long ledgerId);

	public String deleteByLedgerId(Long ledgerId);

	@Query("SELECT l FROM LedgerEntity l WHERE l.userId = :userId AND l.companyId = :companyId")
	List<LedgerEntity> getAllEntities(Long userId, Long companyId);
	
    Optional<LedgerEntity> findByLedgerNameAndUnderGroup(String ledgerName, String underGroup);

}