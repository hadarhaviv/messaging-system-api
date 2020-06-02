const express = require('express');
const {
  getInbox,
  createMessage,
  deleteMessage,
  getSentItems
} = require('../controllers/messages');

const router = express.Router();

router.route('/inbox').get(getInbox);

router.route('sent-items').get(getSentItems);

router.route('/').post(createMessage);

router.route('/:id').delete(deleteMessage);

module.exports = router;
