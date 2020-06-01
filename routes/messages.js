const express = require('express');
const {
  getMessages,
  createMessage,
  deleteMessage
} = require('../controllers/messages');

const router = express.Router();

router.route('/').get(getMessages).post(createMessage);

router.route('/:id').delete(deleteMessage);

module.exports = router;
