package com.korea.board.dto;

import com.korea.board.entity.BoardEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardDTO {
	
	private Long id;
	private String title;
	private String author;
	private String writingTime;
	private String content;
	
//	public BoardDTO(final BoardEntity entity) {
//		this.id = entity.getId();
//		this.title = entity.getTitle();
//		this.author = entity.getAuthor();
//		this.writingTime = entity.getWritingTime();
//		this.content = entity.getContent();
//	}
//	public static BoardEntity toEntity (BoardDTO dto) {
//		return BoardEntity.builder()
//				.id(dto.getId())
//				.title(dto.getTitle())
//				.author(dto.getAuthor())
//				.writingTime(dto.getWritingTime())
//				.content(dto.getContent())
//				.build();
//	}

}
