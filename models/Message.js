const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please add a message subject'],
    maxlength: 100
  },
  body: {
    type: String,
    required: [true, 'Please add a message body']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Please add a receiver to the message']
  }
});

module.exports = mongoose.model('Message', messageSchema);
