package com.erp.service;

import java.util.List;
import java.util.Optional;

import com.erp.entity.DebitEntity;

public interface DebitService {

    DebitEntity saveDebit(DebitEntity entity);

    Optional<DebitEntity> getById(Long id);

    String deleteDebitById(Long id);

    DebitEntity updateDebit(DebitEntity entity, Long debitId);

    List<DebitEntity> saveAllDebits(List<DebitEntity> debits);

    List<DebitEntity> getAllByUserIdAndCompanyId(Long userId, Long companyId);
}
