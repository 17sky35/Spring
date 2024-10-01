package ex01;

class Car {};

class SportCar extends Car {
	public SportCar() {
		System.out.println("스포츠카 객체 생성");
	}
};

class Truck extends Car {
	public Truck() {
		System.out.println("트럭 객체 생성");
	}
};

public class Main {
	public static void main(String[] args) {
		
		Car car = new SportCar();
		Car car1 = getCar();
		Car car2 = getCar();
		Car car3 = getCar();
		Car car4 = getCar();
		Car car5 = getCar();
		Car car6 = getCar();
		Car car7 = getCar();
		Car car8 = getCar();
		Car car9 = getCar();
		Car car10 = getCar();
	}
	
	public static Car getCar() {
		return new Truck();
	}
}
