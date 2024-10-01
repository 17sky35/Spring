package com.example.demo.qualifier;

import org.springframework.stereotype.Component;

@Component
public interface Computer {

	//스크린의 가로 길이를 반환하는 메서드
	public int getScreenWidth();
}
