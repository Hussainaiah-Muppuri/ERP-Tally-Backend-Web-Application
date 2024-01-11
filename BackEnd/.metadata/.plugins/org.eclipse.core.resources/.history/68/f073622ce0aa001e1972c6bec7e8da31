package com.erp.serviceImpl;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.erp.entity.DebitEntity;
import com.erp.repository.DebitRepo;
import com.erp.service.DebitService;
@Service
public class DebitServiceImpl implements DebitService{
	
	private DebitRepo repo;

	@Override
	public Boolean saveDebit(DebitEntity entity) {
		repo.save(entity);
		return true;
	}

	@Override
	public DebitEntity getById(Integer id) {
		Optional<DebitEntity> findById = repo.findById(id);
		
		if (findById.isPresent()) {
			DebitEntity debitEntity = findById.get();
			return debitEntity;
		}
		
		return null;
	}

	@Override
	public String deleteDebitById(Integer id) {
		repo.deleteById(id);
		return "delete successfully";
	}

	@Override
	public DebitEntity updateDebit(DebitEntity entities) {
		DebitEntity debitEntity = repo.findById(entities.getDebitId()).get();
		BeanUtils.copyProperties(entities, debitEntity);
		repo.save(debitEntity);
		return debitEntity;
	}

}
