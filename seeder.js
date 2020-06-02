const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
const randomWords = require('random-words');

dotenv.config({ path: './config/config.env' });

const User = require('./models/User');
const Message = require('./models/Message');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const importData = async () => {
  try {
    const messages = [];
    const users = await User.find().select({ _id: 1 });

    for (let i = 0; i < 40; i++) {
      const email = {};
      email.subject = randomWords({ min: 1, max: 5, join: ' ' });
      email.messageBody = randomWords({ min: 5, max: 50, join: ' ' });
      email.sender = users[getRandomInt(3)]._id;
      email.receiver = users[getRandomInt(3)]._id;

      while (email.sender === email.receiver) {
        email.receiver = users[getRandomInt(3)]._id;
      }
      messages.push(email);
    }
    await Message.create(messages);
    console.log(`Data Imported...`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red.inverse);
  }
};

const deleteData = async () => {
  try {
    await Message.deleteMany();
    console.log(`Data Destroyed...`.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err.red.inverse);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
