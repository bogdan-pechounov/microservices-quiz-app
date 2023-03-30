const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka-broker.kafka.svc.cluster.local:9092'],
})

async function userCreated(user) {
  try {
    // producer
    const producer = kafka.producer()
    await producer.connect()
    // send
    await producer.send({
      topic: 'user-created',
      messages: [{ value: JSON.stringify(user) }],
    })
    await producer.disconnect()
  } catch (err) {
    console.error(err)
  }
}

module.exports = { userCreated }
