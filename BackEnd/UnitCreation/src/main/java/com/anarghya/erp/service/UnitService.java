package com.anarghya.erp.service;

import com.anarghya.erp.entity.UnitEntity;

import java.util.List;
import java.util.Optional;

public interface UnitService {

    List<UnitEntity> getAllUnits();

    Optional<UnitEntity> getUnitById(Long unitId);

    UnitEntity saveUnit(UnitEntity unit);

    UnitEntity updateUnit(Long unitId, UnitEntity updatedUnit);

    void deleteUnit(Long unitId);

	List<UnitEntity> getAllUnitsByUserIdAndCompanyId(Long userId, Long companyId);
	
	List<UnitEntity> saveAllUnits(List<UnitEntity> units);
}
