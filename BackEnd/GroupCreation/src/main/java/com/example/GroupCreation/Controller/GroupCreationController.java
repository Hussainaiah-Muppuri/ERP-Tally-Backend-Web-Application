package com.example.GroupCreation.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.GroupCreation.Modal.GroupCreationModal;
import com.example.GroupCreation.Service.GroupCreationService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class GroupCreationController {

	@Autowired
	private GroupCreationService service;

	@GetMapping("/groups/{groupId}")
	public ResponseEntity<GroupCreationModal> getGroupById(@PathVariable long groupId) {
		Optional<GroupCreationModal> group = service.getGroupById(groupId);
		return group.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@GetMapping("/group/user/{userId}/company/{companyId}")
	public ResponseEntity<List<GroupCreationModal>> getGroupById(@PathVariable long userId,
			@PathVariable long companyId) {
		List<GroupCreationModal> groups = service.getGroupsByUserIdAndCompanyId(userId, companyId);
		return groups.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(groups);
	}

	@PostMapping("/group")
	public ResponseEntity<ResponseEntity<String>> createGroup(@RequestBody GroupCreationModal pojo) {
		ResponseEntity<String> result = service.addGroup(pojo);
		return ResponseEntity.ok(result);
	}

//	@PostMapping("/group/multiple")
//	public ResponseEntity<ResponseEntity<List<GroupCreationModal>>> addMultipleGroups(@RequestBody List<GroupCreationModal> pojo) {
//		ResponseEntity<List<GroupCreationModal>> results = (ResponseEntity<List<GroupCreationModal>>) service.addMultipleGroups(pojo);
//		return ResponseEntity.ok(results);
//	}
	
	@PostMapping("/group/multiple")
	public ResponseEntity<List<GroupCreationModal>> addMultipleGroups(@RequestBody List<GroupCreationModal> pojo) {
	    List<GroupCreationModal> results = service.addMultipleGroups(pojo);
	    return ResponseEntity.ok(results);
	}

	@PutMapping("/group/{groupId}")
	public ResponseEntity<GroupCreationModal> updateGroupById(@PathVariable long groupId,
			@RequestBody GroupCreationModal update) {
		GroupCreationModal result = service.updateGroup(groupId, update);
		return ResponseEntity.ok(result);
	}

	@DeleteMapping("/group/{groupId}")
	public ResponseEntity<String> deleteGroupById(@PathVariable long groupId) {
		String result = service.deleteGroup(groupId);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/groups")
	public List<GroupCreationModal> getAllgrps() {
		return service.getAllGrp();

	}
}