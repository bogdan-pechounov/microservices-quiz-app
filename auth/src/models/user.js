const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        console.log(doc, ret)
        // ret.id = ret._id
        // delete ret._id
        // delete ret.password
        // delete ret.__v
      },
    },
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
