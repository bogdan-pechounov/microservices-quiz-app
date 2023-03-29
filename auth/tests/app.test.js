const request = require('supertest')
const app = require('../src/app.js')

const {
  mockListTopics,
  mockAdminConnect,
  mockSend,
  mockSubscribe,
} = require('./utils/kafka.js')

const { testConnection } = require('../src/kakfka/connect.js')

describe('App', () => {
  test('responds with a default message', async () => {
    const response = await request(app).get('/api/auth')
    expect(response.statusCode).toBe(200)
    expect(response.text.length).toBeGreaterThan(0)
  })

  test('kafkajs mocked', async () => {
    await testConnection()
    expect(mockAdminConnect).toHaveBeenCalled()
    expect(mockListTopics).toHaveBeenCalled()
    expect(mockSend).toHaveBeenCalledWith({
      topic: 'test-topic',
      messages: [{ value: 'Hello KafkaJS user!' }],
    })
    expect(mockSubscribe).toHaveBeenCalledWith({
      topic: 'test-topic',
      fromBeginning: true,
    })
  })
})
