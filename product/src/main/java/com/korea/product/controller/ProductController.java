package com.korea.product.controller;

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

import com.korea.product.dto.ProductDTO;
import com.korea.product.service.ProductService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/products")
public class ProductController {

	private final ProductService service;
	
//	//상품추가
//	@PostMapping
//	public ResponseEntity<?> addProduct(@RequestBody ProductDTO dto) {
//		ProductDTO createProduct = service.addProduct(dto);
//		return ResponseEntity.ok().body(createProduct);
//	}
	
   //임의상품추가
   @PostMapping
   public ResponseEntity<?> addProduct(){
      return ResponseEntity.ok().body(service.addProduct());
   }

   //상품조회
   //localhost:9090/api/products?minPrice=900&name=""
   @GetMapping
   public ResponseEntity<List<ProductDTO>> getFilteredProducts(
           @RequestParam(value = "minPrice", required = false) Double minPrice,
           @RequestParam(value = "name", required = false) String name){
	  List<ProductDTO> products = service.getFilteredProducts(minPrice, name);
	  return ResponseEntity.ok(products);
   }
   
   //수정하기
 //localhost:9090/api/products/1
   @PutMapping("/{id}")
   public ResponseEntity<?> updateProduct(@PathVariable int id,@RequestBody ProductDTO dto){
	   ProductDTO u_dto = service.updateProduct(id, dto);
	   if(u_dto != null) {
		   return ResponseEntity.ok().body(u_dto);
	   }
	   return ResponseEntity.badRequest().body("업데이트가 안됐습니다.");
   }
   
   //삭제하기
   //localhost:9090/api/products/1
   @DeleteMapping("/{id}")
   public ResponseEntity<?> deleteProduct(@PathVariable int id){
	   boolean isdelete = service.deleteProduct(id);	   
	   if(isdelete) {		   
		   return ResponseEntity.ok("삭제");
	   }
	   return ResponseEntity.badRequest().body("실패");
	     
   }
   
}



