const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-broker.kafka.svc.cluster.local:9092'],
})

async function createProducer() {
  const producer = kafka.producer()

  try {
    await producer.connect()
    console.log('connected', producer)
    // await producer.send({
    //   topic: 'test-topic',
    //   messages: [{ value: 'Hello KafkaJS user!' }],
    // })

    // await producer.disconnect()
  } catch (err) {
    console.log("Couldn' connect to broker")
    console.error(err)
  }
}

async function createConsumer() {
  const consumer = kafka.consumer({ groupId: 'test-group' })

  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      })
    },
  })
}

createProducer()
