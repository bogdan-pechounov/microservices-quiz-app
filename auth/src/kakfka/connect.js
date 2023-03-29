const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-broker.kafka.svc.cluster.local:9092'],
  // brokers: ['kafka-broker:9092'],
})

/**
 * Send message in test topic
 */
async function test() {
  try {
    // admin
    const admin = kafka.admin()
    await admin.connect()
    console.log('admin connected')
    console.log('TOPICS', await admin.listTopics())
    // producer
    const producer = kafka.producer()
    await producer.connect()
    console.log('producer connected')
    // send
    await producer.send({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    })
    // await producer.disconnect()

    // consumer
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    console.log('consumer connected')
    // receive
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          'CONSUME',
          topic,
          partition,
          message,
          message.value.toString()
        )
      },
    })
  } catch (err) {
    console.error(err)
  }
}

test()
