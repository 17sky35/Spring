package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.UserEntity;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {

	private final UserService service;
	
	private final TokenProvider tokenProvider;
	
	//회원가입 -> 데이터베이스에 데이터를 추가
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody UserDTO dto){
		//request body에 포함된 UserDOT객체를 수신하여 처리한다.
		try {
			//UserDTO를 기반으로 UserEntity객체를 생성한다
			UserEntity user = UserEntity.builder()
										.username(dto.getUsername())
										.password(dto.getPassword())
										.build();
			//UserService 를 이용해 새로 만든 UserEntity를 데이터베이스에 저장한다.
			UserEntity registeredUser = service.create(user);
			
			//등록된 UserEntity정보를 UserDTO로 변호나하여 응답에 사용한다.
			UserDTO responseUserDTO = UserDTO.builder()
											.id(registeredUser.getId())
											.username(registeredUser.getUsername())
											.build();
			
			//성공적으로 저장된 유저 정보를 포함한 HTTP 200응답을 반환한다.
			return ResponseEntity.ok().body(responseUserDTO);
			
		} catch (Exception e) {
			//예외가 발생한 경우, 에러 메시지를 포함한 ResponseDTO객체를 만들어 응답한다.
			ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage()).build();
			
			//HTTP 400 상태코드를 반환하고, 에러 메시지를 Response Body에 포함시킨다.
			return ResponseEntity.badRequest().body(responseDTO);
			
		}
	}
	
	//아이디와 비밀번호를 입력받아 로그인 처리
	@PostMapping("/signin")
	public ResponseEntity<?> authenticate(@RequestBody UserDTO dto){
		//요청본문으로 전달된 UserDTO의 username과 password를 기반으로 유저를 조회
		UserEntity user = service.getByCredentials(dto.getUsername(), dto.getPassword());
		//사용자가 존재한다면
		if(user != null) {
			//토큰 생성
			final String token = tokenProvider.create(user);
			
			
			//인증에 성공한 경우 유저 정보를 UserDTO로 변환하여 응답에 사용한다.
			//dto에 토큰을 실어서 보냄
			final UserDTO responseUserDTO = UserDTO.builder()
													.id(user.getId())
													.username(user.getUsername())
													.token(token)
													.build();
			//성공적으로 인증된 유저 정보를 포함한 HTTP 200 응답을 반환한다.
			return ResponseEntity.ok().body(responseUserDTO);
		}else {
			//유저가 존재하지 않거나 실패히 에러 메시지를 포함한 ResponseDTO를 반환한다.
			ResponseDTO responseDTO = ResponseDTO.builder()
												.error("Login failed")//에러 메시지 설정
												.build();//ResponseDTO 객체를 빌드
			//HTTP 400 상태 코드를 반환하고, 에러 메시지를 응답 본문에 포함시킨다.
			return ResponseEntity.badRequest().body(responseDTO);
		}
	}
	
}
