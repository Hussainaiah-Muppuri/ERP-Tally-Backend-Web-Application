package com.example.GroupCreation.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.GroupCreation.Modal.GroupCreationModal;
import com.example.GroupCreation.Repository.GroupCreationRepository;

@Service
public class GroupCreationServiceImplementation implements GroupCreationService 
{
		     @Autowired
		    private GroupCreationRepository groupRepo;
		     
		     public Optional<GroupCreationModal> getGroupById(Long groupId) {
		        return groupRepo.findById(groupId);
		    }

		    @Override
		    public ResponseEntity<String> addGroup(GroupCreationModal group) {
//		        if (groupRepo.findByGroupName(group.getGroupName()) != null)
//		            return ResponseEntity.badRequest().body("Group is Already Present.");
//		
		        groupRepo.save(group);
		        return ResponseEntity.ok("Group added Successfully");
		    }

//		    @Override
//		    public List<GroupCreationModal> addMultipleGroups(List<GroupCreationModal> group) {
////		        List<String> results = new ArrayList<>();
////		        for (GroupCreationModal pojo : group) {
////		            results.add(addGroup(pojo).getBody());
////		        }
////		        return results;
////		    }
//		    	 List<GroupCreationModal> results = new ArrayList<>();
//			        for (GroupCreationModal modal : group) {
//			            if (!isGroupAlreadyExists(modal)) {
//			            	GroupCreationModal savedLedger = groupRepo.save(modal);
//			                results.add(savedLedger);
//			            } 
//			        }
//			        return results;
//		    }
//		    
//		    private boolean isGroupAlreadyExists(GroupCreationModal group) {
//		        Optional<GroupCreationModal> existingLedger = groupRepo.findByGroupNameAndUnder(
//		                group.getGroupName(), group.getUnder());
//		              return existingLedger.isPresent();
//		         }

		    @Override
		    public List<GroupCreationModal> addMultipleGroups(List<GroupCreationModal> group) {
		        List<GroupCreationModal> results = new ArrayList<>();
		        for (GroupCreationModal modal : group) {
		            if (!isGroupAlreadyExists(modal)) {
		                GroupCreationModal savedLedger = groupRepo.save(modal);
		                results.add(savedLedger);
		            }
		        }
		        return results;
		    }

		    private boolean isGroupAlreadyExists(GroupCreationModal group) {
		        Optional<GroupCreationModal> existingLedger = groupRepo.findByGroupNameAndUnder(
		                group.getGroupName(), group.getUnder());
		        return existingLedger.isPresent();
		    }
		    
		    @Override
		    public String deleteGroup(Long groupId) {
		               groupRepo.deleteById(groupId);
		        return "Deleted Successfully ";
		    }

		    @Override
		    public GroupCreationModal updateGroup(Long groupId, GroupCreationModal update) {
		        update.setGroupId(groupId);
		        return groupRepo.save(update);
		    }

		    @Override
		    public List<GroupCreationModal> getAllGroups() {
		        return groupRepo.findAll();
		    }

		    public List<GroupCreationModal> getGroupsByUserIdAndCompanyId(long userId, long companyId) {
		        return groupRepo.findByUserIdAndCompanyId(userId, companyId);
		    }

			@Override
			public List<GroupCreationModal> getAllGrp() {
				return groupRepo.findAll();
			}
			
			@Override
			public boolean isGroupNameAndUnderAlreadyExist(GroupCreationModal modal) {
				Optional<GroupCreationModal> exist = groupRepo.findByGroupNameAndUnder(modal.getGroupName(), modal.getUnder());
				return exist.isPresent();
			}

			@Override
			public boolean isGroupNameAndUnderAlreadyExist(String groupName, String under) {
				
				return false;
			}
  }