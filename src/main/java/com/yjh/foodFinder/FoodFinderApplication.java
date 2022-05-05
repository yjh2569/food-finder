package com.yjh.foodFinder;

import java.util.TimeZone;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EntityScan(basePackageClasses = { FoodFinderApplication.class, Jsr310JpaConverters.class })
public class FoodFinderApplication {
	
	@PostConstruct void init() { 
		TimeZone.setDefault(TimeZone.getTimeZone("UTC")); 
	}

	public static void main(String[] args) {
		SpringApplication.run(FoodFinderApplication.class, args);
	}

}
