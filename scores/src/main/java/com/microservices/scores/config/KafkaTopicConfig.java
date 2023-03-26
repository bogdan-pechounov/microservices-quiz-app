package com.microservices.scores.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {

  @Bean
  public NewTopic testTopic() {
    System.out.println("I AM HERE");
    return TopicBuilder.name("test-topic").build();
  }
}
