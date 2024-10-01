package ex02;

import java.io.FileReader;
import java.util.Properties;

class Car{};
class SportCar extends Car{};
class Truck extends Car{};
class Engine{}

public class Main1 {
	public static void main(String[] args) throws Exception{
		//객체는 함수로부터 반환받을 것이다.
		Car car = (Car)getCar("car");
		System.out.println("car = " + car);
		
		Truck truck = (Truck)getCar("truck");
		System.out.println("truck = " + truck);
		
		Engine engine = (Engine)getCar("engine");
		System.out.println("engine = " + engine);
	}
	
	static Object getCar(String key) throws Exception{
		//java.util.Properties클래스
		//키와 값의 쌍으로 구성된 속성 목록들을 관리할 때 사용
		//일반적으로 구성 파일이나 속성 파일에서 설정 정보를 읽거나 쓸 때 사용
		
		//사용법은 Map과 비슷하다.
		//Properties는 (String, String)을 저장한다.
		Properties p = new Properties();
		
		//load()
		//파일이나 스트림으로부터 읽어올 때 사용한다.
		p.load(new FileReader("config.txt"));
		
		//Class클래스
		//클래스 메타데이터를 제공하는 클래스
		//Class.forName()
		//Class.getClass() 메서드를 통해 클래스의 정보를 가져올 수 있다.
		//getProperty("key") -> key를 통해 value를 가져온다.
		Class clazz = Class.forName(p.getProperty(key));
		
		//newInstance()
		//클래스 정보를 가지고 동적으로 객체를 생성할 때 사용하는 메서드
		//매개변수가 없는 기본생성자를 호출해서 객체를 생성해준다.
		return (Object)clazz.newInstance();
		
	}
}
