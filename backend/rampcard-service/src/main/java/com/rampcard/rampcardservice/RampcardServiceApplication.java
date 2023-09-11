package com.rampcard.rampcardservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableEurekaClient
public class RampcardServiceApplication {

	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}

	public static void main(String[] args) {
		SpringApplication.run(RampcardServiceApplication.class, args);
	}

	@EnableWebMvc
	public static class WebConfig implements WebMvcConfigurer {
		@Override
		public void addCorsMappings(CorsRegistry registry) {
			registry.addMapping("/**")
					.allowedOrigins("http://localhost:8080") // Allow requests from this origin
					.allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE") // Allow specific HTTP methods
					.allowedHeaders("*"); // Allow all headers
		}
	}
}
