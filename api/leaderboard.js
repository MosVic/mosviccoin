const mongoose = require('mongoose');

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('your-mongodb-connection-string', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

const UserSchema = new mongoose.Schema({
  username: String,
  score: Number,
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = async (req, res) => {
  await connectToDatabase();

  const users = await User.find().sort({ score: -1 }).limit(10);
  res.json(users);
};
