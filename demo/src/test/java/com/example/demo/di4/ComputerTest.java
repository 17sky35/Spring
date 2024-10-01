package com.example.demo.di4;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ComputerTest {
	
	@Autowired
	Coding coding; //스프링이 ComponentScan을 해서 만든 객체를 주입해준다.
	
	@Test
	public void computerTest() {
//		Coding coding = new Coding();
		System.out.println(coding.getComputer().getRam());
	}
}
