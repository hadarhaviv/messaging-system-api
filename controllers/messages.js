const Message = require('../models/Message');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');

const getPopulate = path => ({ path, select: 'name email' });

exports.getInbox = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ receiver: req.user.id })
    .select({ __v: 0 })
    .populate(getPopulate('sender'))
    .populate(getPopulate('receiver'));
  if (!messages.length) {
    return res.status(204).json({ success: true, data: [] });
  }
  return res.status(200).json({ success: true, data: messages });
});

exports.getSentItems = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({ sender: req.user.id })
    .select({ __v: 0 })
    .populate(getPopulate('sender'))
    .populate(getPopulate('receiver'));
  if (!messages.length) {
    return res.status(204).json({ success: true, data: [] });
  }
  return res.status(200).json({ success: true, data: messages });
});

exports.createMessage = asyncHandler(async (req, res, next) => {
  const receiver = await User.findOne({ email: req.body.email });

  if (!receiver) {
    return res.status(400).json({ success: false });
  }
  req.body.sender = req.user.id;
  req.body.receiver = receiver._id;
  const message = await Message.create(req.body);
  return res.status(200).json({ success: true, data: message });
});

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.id;
  const message = await Message.findById(id);
  if (!message) {
    return res.status(400).json({ success: false });
  }

  if (
    message.receiver.toString() !== userId &&
    message.sender._id.toString() !== userId
  ) {
    return res.status(401).json({ success: false });
  }

  message.remove();

  return res.status(200).json({ success: true });
});
