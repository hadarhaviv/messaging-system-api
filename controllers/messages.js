const Message = require('../models/Message');
const asyncHandler = require('../middleware/async');

const getPopulate = path => ({ path, select: 'name email' });

exports.getInbox = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ receiver: req.user.id })
    .select({ __v: 0 })
    .populate(getPopulate('sender'))
    .populate(getPopulate('receiver'));
  return res.status(200).json({ success: true, data: messages });
});

exports.getSentItems = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ sender: req.user.id })
    .select({ __v: 0 })
    .populate(getPopulate('sender'))
    .populate(getPopulate('receiver'));
  return res.status(200).json({ success: true, data: messages });
});

exports.createMessage = asyncHandler(async (req, res, next) => {
  req.body.sender = req.user.id;
  const message = await Message.create(req.body);
  return res.status(200).json({ success: true, data: message });
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const message = await Message.findById(id);
  if (!message) {
    return res.status(400).json({ success: false });
  }
  message.remove();

  return res.status(200).json({ success: true });
});
