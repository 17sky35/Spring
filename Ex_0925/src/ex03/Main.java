package ex03;

import java.io.FileReader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

class Car{}
class SportCar extends Car{}
class Truck extends Car{}
class Engine{}

class AppContext{
	Map map; //객체 저장소
	
	public AppContext() {
		try {
			Properties p = new Properties();
			p.load(new FileReader("config.txt"));
			
			map = new HashMap(p);
			
			//반복문을 통해서 클래스 이름을 얻고 객체를 생성해서 다시 map 저장
			for(Object key : map.keySet()) {
				Class clazz = Class.forName((String)map.get(key));
				map.put(key, clazz.newInstance());
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
//		map = new HashMap();
//		map.put("car", new SportCar());
//		map.put("truck", new Truck());
//		map.put("engine", new Engine());
	}
	
	Object getBean(String key) {
		return map.get(key);
	}
}

public class Main {
	public static void main(String[] args) {
		AppContext ac = new AppContext();
		
		Car car = (Car)ac.getBean("car");
		System.out.println("car = " + car);
		
		Truck truck = (Truck)ac.getBean("truck");
		System.out.println("truck = " + truck);
		
		Engine engine = (Engine)ac.getBean("engine");
		System.out.println("engine = " + engine);
	}
}
