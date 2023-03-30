package kafka

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"quiz/database"
	"quiz/models"

	"github.com/segmentio/kafka-go"
)

func ListTopics() {
	conn, err := kafka.Dial("tcp", "kafka-broker.kafka.svc.cluster.local:9092")
	if err != nil {
		panic(err.Error())
	}
	defer conn.Close()

	partitions, err := conn.ReadPartitions()
	if err != nil {
		panic(err.Error())
	}

	m := map[string]struct{}{}

	for _, p := range partitions {
		m[p.Topic] = struct{}{}
	}

	fmt.Println(m)
}

func UserConsumer() {
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{"kafka-broker.kafka.svc.cluster.local:9092"},
		GroupID:  "consumer-group-id",
		Topic:    "user-created",
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})

	for {
		m, err := r.ReadMessage(context.Background())
		if err != nil {
			fmt.Println(err)
			break
		}
		fmt.Printf("message at topic/partition/offset %v/%v/%v: %s = %s\n", m.Topic, m.Partition, m.Offset, string(m.Key), string(m.Value))

		var user models.User

		fmt.Println(user)

		json.Unmarshal(m.Value, &user)

		fmt.Println(user)

		// create user
		database.Instance.Create(&user)
	}

	if err := r.Close(); err != nil {
		log.Fatal("failed to close reader:", err)
	}
}
