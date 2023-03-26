package com.microservices.scores;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;

@SpringBootApplication
public class ScoresApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScoresApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(KafkaTemplate<String, String> kafkaTemplate){
		return args -> {
			for (int i = 0; i < 10_000; i++) {
				kafkaTemplate.send("test-topic", "Hello, kafka " + i);
			}
		};
	}

}
