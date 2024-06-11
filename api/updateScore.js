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

  const { username, score } = req.body;
  let user = await User.findOne({ username });
  if (user) {
    user.score = score;
  } else {
    user = new User({ username, score });
  }
  await user.save();
  res.send('Score updated');
};
