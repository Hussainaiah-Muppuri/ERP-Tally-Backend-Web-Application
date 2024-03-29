package com.erp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erp.entity.DebitEntity;

@Repository
public interface DebitRepo extends JpaRepository<DebitEntity, Long> {

    List<DebitEntity> findAllByUserIdAndCompanyId(Long userId, Long companyId);
}
