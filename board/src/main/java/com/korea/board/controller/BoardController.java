package com.korea.board.controller;

import java.util.Arrays;
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

import com.korea.board.dto.BoardDTO;
import com.korea.board.dto.ResponseDTO;
import com.korea.board.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {
	
	private final BoardService service;
	//조회
	@GetMapping("/all")
	public ResponseEntity<?> getAllPosts(){
		List<BoardDTO> dtos = service.getAllPosts();
		ResponseDTO<BoardDTO> response = ResponseDTO.<BoardDTO>builder().data(dtos).build();
		return ResponseEntity.ok().body(response);
	}
	
	//id 로 조회
	@GetMapping("/get/{id}")
	public ResponseEntity<?> getPostById(@PathVariable Long id){
		BoardDTO createDto = service.getPostById(id);
		List<BoardDTO> dtos = Arrays.asList(createDto);
		ResponseDTO<BoardDTO> response = ResponseDTO.<BoardDTO>builder().data(dtos).build();
		return ResponseEntity.ok().body(response);
	}
	
	//추가
	@PostMapping("/write")
	public ResponseEntity<?> addBoard(@RequestBody BoardDTO dto){
		BoardDTO createDto = service.createBoard(dto);
		List<BoardDTO> dtos = Arrays.asList(createDto);
		ResponseDTO<BoardDTO> response = ResponseDTO.<BoardDTO>builder().data(dtos).build();
		return ResponseEntity.ok(response);
	}
	
	//수정
	@PutMapping("/modify/{id}")
	public ResponseEntity<?> updateBoard(@PathVariable Long id, @RequestBody BoardDTO dto){
		BoardDTO updateDto = service.updateBoard(dto, id);
		if(updateDto != null) {
			return ResponseEntity.ok().body(updateDto);
		}
		return ResponseEntity.badRequest().body("업데이트 실패!!");
	}
	
	//삭제
	@DeleteMapping("/delete/{id}")
	public boolean deleteBoard(@PathVariable Long id){
		return service.deleteBoard(id);
	}		
}
