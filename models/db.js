const mongoose = require('mongoose');

const MONGOURI = process.env.MONGOURI;

if (!MONGOURI) {
  throw new Error('MONGOURI environment variable not set');
}

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose; 