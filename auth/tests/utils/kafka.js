//mock kafkajs
const kafkajs = require('kafkajs')

let mockAdminConnect = jest.fn()
let mockListTopics = jest.fn(() => Promise.resolve('test-topics'))
let mockSend = jest.fn()
let mockSubscribe = jest.fn()

jest.mock('kafkajs', () => {
  return {
    Kafka: jest.fn().mockImplementation(() => {
      return {
        admin() {
          return {
            connect: mockAdminConnect,
            listTopics: mockListTopics,
          }
        },
        producer() {
          return {
            connect: jest.fn(),
            send: mockSend,
            disconnect: jest.fn(),
          }
        },
        consumer() {
          return {
            connect: jest.fn(),
            subscribe: mockSubscribe,
            run: jest.fn(),
          }
        },
      }
    }),
  }
})

module.exports = { mockListTopics, mockAdminConnect, mockSend, mockSubscribe }
