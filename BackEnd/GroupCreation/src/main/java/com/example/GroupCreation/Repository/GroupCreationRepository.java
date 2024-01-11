package com.example.GroupCreation.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.GroupCreation.Modal.GroupCreationModal;

@Repository
public interface GroupCreationRepository extends JpaRepository<GroupCreationModal, Long>
{
	 Optional<List<GroupCreationModal>> findByGroupName(String groupName);
    
	 List<GroupCreationModal> findByUserIdAndCompanyId(@Param("userId") Long userId, @Param("companyId") Long companyId);

	  Optional<GroupCreationModal> findByGroupNameAndUnder(String groupName, String under);

}
