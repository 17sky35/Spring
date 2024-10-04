package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.model.UserEntity;
import com.example.demo.presistence.UserRepository;
import com.example.demo.security.TokenProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

	private final UserRepository repository;
	
	//유저를 생성하는 메서드
	public UserEntity create(UserEntity entity) {
		//주어진 entity가 null이거나 또는 username이 null인경우 예외 발생
		if(entity == null || entity.getUsername() == null) {
			//유효하지 않은 인자에 대해 예외를 발생시킨다.
			throw new RuntimeException("Invalid arguments");
		}
		
		//entity에서 username을 가져와 변수에 저장
		final String username = entity.getUsername();
		
		//주어진 username이 이미 존재하는 경우, 경고 로그를 남기고 예외를 던진다.
		if(repository.existsByUsername(username)) {
			//이미 존재하는 username에 대해 로그를 기록한다.
			log.warn("Username already exists {}",username);
			throw new RuntimeException("Username already exists");
		}		
		//username이 중복되지 않았다면, entity를 데이터베이스에 저장
		return repository.save(entity);		
	}
	
	//주어진 username과 password로 Userentity 조회하기
	public UserEntity getByCredentials(String username, String password) {
		return repository.findByUsernameAndPassword(username, password);
	}
	
	
	
	
	
	
	
	
	
}
