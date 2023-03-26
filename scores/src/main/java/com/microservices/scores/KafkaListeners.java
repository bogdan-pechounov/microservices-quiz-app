package com.microservices.scores;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class KafkaListeners {

    @KafkaListener(topics = "test-topic", groupId = "id")
    void listener(String data){
        System.out.println("Listener received: " + data);
    }
}
