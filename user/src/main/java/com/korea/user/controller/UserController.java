package com.korea.user.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korea.user.dto.UserDTO;
import com.korea.user.model.UserEntity;
import com.korea.user.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
	
	private final UserService service;
	
	//유저 생성(회원가입)
	@PostMapping
	public ResponseEntity<List<UserDTO>> createUser(@RequestBody UserDTO dto) {
		//서비스로 보내기 위해서 DTO -> Entity로 바꿈
		UserEntity entity = UserDTO.toEntity(dto);
		List<UserDTO> users = service.create(entity);
		return ResponseEntity.ok(users);
		
	}
	
	//모든 유저 조회하기
	@GetMapping
	public ResponseEntity<?> getAllUsers(){
		List<UserDTO> users = service.getAllUsers();
		return ResponseEntity.ok().body(users);
	}
	
	//이메일을 통한 유저 조회
	@GetMapping("/{email}")
	public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email){
		UserDTO user = service.getUserByEmail(email);
		return ResponseEntity.ok(user);
	}
	
	//ID를 통해 이름과 이메일 수정(마이페이지)
	@PutMapping
	public ResponseEntity<?> updateUser(@RequestBody UserDTO dto){
		UserEntity entity = UserDTO.toEntity(dto);
		List<UserDTO> updateUser = service.updateUser(entity);
		return ResponseEntity.ok(updateUser);
	}
	
	//삭제하기(회원탈퇴)
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteUser(@PathVariable int id){
		boolean isDelete = service.deleteUser(id);
		if(isDelete) {
			return ResponseEntity.ok("User deleted successfully");
		}else {
			return ResponseEntity.status(404).body("User not found with id " + id);
		}
	}
	
	
}
