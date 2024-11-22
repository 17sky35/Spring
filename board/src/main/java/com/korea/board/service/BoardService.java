package com.korea.board.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.korea.board.dto.BoardDTO;
import com.korea.board.entity.BoardEntity;
import com.korea.board.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {
	
	private final BoardRepository repository;
	
	//조회
	public List<BoardDTO> getAllPosts(){
		//repository.findAll()의 반환값이 List<BoardEntity>
		return repository.findAll().stream().map(this::convertDTO).collect(Collectors.toList());
	}
	
	//id 로 조회
	public BoardDTO getPostById(Long id) {
		Optional<BoardEntity> board = repository.findById(id);
		return board.map(this::convertDTO).orElseThrow(()->new RuntimeException("게시글을 찾을 수 없습니다."));
	}
	
	//추가
	public BoardDTO createBoard(BoardDTO dto){
		dto.setWritingTime(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")));
		BoardEntity entity = converToEntity(dto);
		return convertDTO(repository.save(entity));
	}
	
	//수정
	public BoardDTO updatePost(BoardDTO dto, Long id) {
		BoardEntity existingBoard = repository.findById(id).orElseThrow(()->new RuntimeException("게시글을 찾을수없습니다."));
		existingBoard.setTitle(dto.getTitle());
		existingBoard.setAuthor(dto.getAuthor());
		existingBoard.setContent(dto.getContent());
		return convertDTO(repository.save(existingBoard));
	}
	
	//삭제
	public boolean deletePost(Long id) {
		Optional<BoardEntity> original = repository.findById(id);
		if(original.isPresent()) {
			repository.deleteById(id);
			return true;
		}
		return false;
	}
	
	
	//Entity -> DTO 변환
	private BoardDTO convertDTO(BoardEntity entity) {
		return BoardDTO.builder()
				.id(entity.getId())
				.title(entity.getTitle())
				.author(entity.getAuthor())
				.writingTime(entity.getWritingTime())
				.content(entity.getContent())
				.build();
	}
	//DTO -> Entity 변환
	private BoardEntity converToEntity(BoardDTO dto) {
		return BoardEntity.builder()
				.id(dto.getId())
				.title(dto.getTitle())
				.author(dto.getAuthor())
				.writingTime(dto.getWritingTime())
				.content(dto.getContent())
				.build();
	}
}
