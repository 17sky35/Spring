package com.korea.api.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;

@RestController
public class NaverBookApplicationController {

	//webClient 의존성 주입
	private final WebClient webClient;

	//application.properties에서 가져온 값을 필드에 매핑
	@Value("${naver.client.id}")
	private String clientId;
	
	@Value("${naver.client.secret}")
	private String clientSecret;
	
	public NaverBookApplicationController(WebClient.Builder webClient) {
		this.webClient = webClient.baseUrl("https://openapi.naver.com/v1/search").build();
	}
	
	@GetMapping("/api/books")
	public Flux<String> searchBooks(@RequestParam String query){
		return webClient.get()
				.uri(uriBuilder -> uriBuilder.path("/book.json")
						.queryParam("query", query)
						.build())
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.header("X-Naver-Client-Id", clientId)
				.header("X-Naver-Client-Secret", clientSecret)
				.retrieve() //요청 보내기
				.bodyToFlux(String.class);//응답을 Flux로 받아 문자열로 변환
	}
	
	@GetMapping("/api/news")
	public Flux<String> searchNews(@RequestParam String query){
		return webClient.get()
				.uri(uriBuilder -> uriBuilder.path("/news.json")
						.queryParam("query", query)
						.build())
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
				.header("X-Naver-Client-Id", clientId)
				.header("X-Naver-Client-Secret", clientSecret)
				.retrieve() //요청 보내기
				.bodyToFlux(String.class);//응답을 Flux로 받아 문자열로 변환
	}
}
