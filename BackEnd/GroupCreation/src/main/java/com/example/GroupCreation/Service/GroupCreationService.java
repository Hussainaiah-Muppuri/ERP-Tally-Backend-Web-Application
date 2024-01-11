package com.example.GroupCreation.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.example.GroupCreation.Modal.GroupCreationModal;


public interface GroupCreationService
{
	ResponseEntity<String> addGroup(GroupCreationModal pojo);

	List<GroupCreationModal> addMultipleGroups(List<GroupCreationModal> group);

    Optional<GroupCreationModal> getGroupById(Long groupId);

    GroupCreationModal updateGroup(Long groupId, GroupCreationModal pojo);

    String deleteGroup(Long groupId);

    List<GroupCreationModal> getAllGroups();

    public List<GroupCreationModal> getGroupsByUserIdAndCompanyId(long userId, long companyId);
    
    public List<GroupCreationModal> getAllGrp();
     
    public boolean isGroupNameAndUnderAlreadyExist(GroupCreationModal pojo);

	public boolean isGroupNameAndUnderAlreadyExist(String groupName, String under);
  
}
