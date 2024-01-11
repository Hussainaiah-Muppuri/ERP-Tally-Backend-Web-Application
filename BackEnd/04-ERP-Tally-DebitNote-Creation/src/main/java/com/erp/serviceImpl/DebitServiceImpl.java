package com.erp.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.erp.entity.DebitEntity;
import com.erp.repository.DebitRepo;
import com.erp.service.DebitService;

@Service
public class DebitServiceImpl implements DebitService {

    @Autowired
    private DebitRepo repo;

    @Override
    public DebitEntity saveDebit(DebitEntity entity) {
        return repo.save(entity);
    }

    @Override
    public Optional<DebitEntity> getById(Long debitId) {
        return repo.findById(debitId);
    }

    @Override
    public String deleteDebitById(Long debitId) {
        repo.deleteById(debitId);
        return "Deleted successfully";
    }

    @Override
    public DebitEntity updateDebit(DebitEntity entity, Long debitId) {
        Optional<DebitEntity> existingDebit = repo.findById(debitId);

        if (existingDebit.isPresent()) {
            entity.setDebitId(debitId);
            return repo.save(entity);
        } else {
            return null;
        }
    }

    @Override
    public List<DebitEntity> saveAllDebits(List<DebitEntity> debits) {
        return repo.saveAll(debits);
    }

    @Override
    public List<DebitEntity> getAllByUserIdAndCompanyId(Long userId, Long companyId) {
        return repo.findAllByUserIdAndCompanyId(userId, companyId);
    }
}