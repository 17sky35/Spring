package com.korea.exam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korea.exam.dto.ProductDTO;
import com.korea.exam.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
	
	private final ProductService service;
	
	
	//상품추가
	@PostMapping
	public ResponseEntity<?> create (@RequestBody ProductDTO dto){
		return ResponseEntity.ok().body(service.addProduct(dto));
	}
	
	
	//전체 조회
	@GetMapping
	public ResponseEntity<List<ProductDTO>> read (){
		List<ProductDTO> products = service.ReadProduct();
		return ResponseEntity.ok().body(products);
	}
	
	
	//id를 통한 특정 조회
	@GetMapping("/{id}")
	public ResponseEntity<List<ProductDTO>> idread (@PathVariable Long id){
		List<ProductDTO> products = service.idReadProduct(id);
		return ResponseEntity.ok().body(products);
	}
	
	
	//Id를 통한 수정
	@PutMapping("/{id}")
	public ResponseEntity<?> update (@PathVariable Long id,@RequestBody ProductDTO dto){
		ProductDTO uProductDTO = service.updateProduct(id, dto);
		if(uProductDTO != null) {
			return ResponseEntity.ok().body(uProductDTO);
		}
		return ResponseEntity.badRequest().body("업데이트가안됐습니다.");
	}
	
	
	//id를 통한 삭제
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		boolean deleteProduct = service.deleteProduct(id);
		if(deleteProduct) {
			return ResponseEntity.ok("삭제");
		}
		return ResponseEntity.badRequest().body("실패");
	}
}
