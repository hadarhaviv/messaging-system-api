const mongoose = require('mongoose');

const MessageScheme = new mongoose.Schema({
  subject: {
    type: String,
    required: [true, 'Please add a message subject'],
    maxlength: 100
  },
  messageBody: {
    type: String,
    required: [true, 'Please add a message body']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', MessageScheme, 'messages');
