package com.korea.exam.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.korea.exam.dto.ProductDTO;
import com.korea.exam.model.ProductEntity;
import com.korea.exam.presistence.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {
	
	private final ProductRepository repository;
	
	//상품 추가
	public ProductDTO addProduct (ProductDTO dot) {
		ProductEntity entity = ProductDTO.toEntity(dot);
		return new ProductDTO(repository.save(entity));	
	}
		
	
	//전체조회
	public List<ProductDTO> ReadProduct() {
		List<ProductEntity> entity = repository.findAll();
		return entity.stream().map(ProductDTO::new).collect(Collectors.toList());
	}
	
	
	
	//id를 통한 특정 조회
	public List<ProductDTO> idReadProduct(Long id) {
		Optional<ProductEntity> entity = repository.findById(id);
		return entity.stream().map(ProductDTO::new).collect(Collectors.toList());
	}
	
	
	//id를 통한 수정
	public ProductDTO updateProduct(Long id,ProductDTO dto) {
		Optional<ProductEntity> original = repository.findById(id);
		if(original.isPresent()) {
			ProductEntity entites = original.get();
			entites.setName(dto.getName());
			entites.setPrice(dto.getPrice());
			repository.save(entites);
			return new ProductDTO(entites);
		}
		return null;
	}
	
	
	//id를 통한 삭제
	public boolean deleteProduct(Long id){
		Optional<ProductEntity> original = repository.findById(id);
		if(original.isPresent()) {
			repository.deleteById(id);
			return true;
		}
		return false;
	}
	
}
