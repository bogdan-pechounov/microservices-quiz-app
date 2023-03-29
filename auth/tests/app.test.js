const request = require('supertest')
const app = require('../src/app.js')

const { testConnection } = require('../src/kakfka/connect.js')

const {
  mockListTopics,
  mockAdminConnect,
  mockSend,
  mockSubscribe,
} = require('./utils/kafka.js')

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

  test('kafkajs mock resets call count', async () => {
    await testConnection()
    expect(mockAdminConnect).toHaveBeenCalledTimes(1)
  })
})
