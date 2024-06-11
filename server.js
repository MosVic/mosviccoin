const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/game', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    score: Number,
});

const User = mongoose.model('User', UserSchema);

app.post('/api/updateScore', async (req, res) => {
    const { username, score } = req.body;
    let user = await User.findOne({ username });
    if (user) {
        user.score = score;
    } else {
        user = new User({ username, score });
    }
    await user.save();
    res.send('Score updated');
});

app.get('/api/leaderboard', async (req, res) => {
    const users = await User.find().sort({ score: -1 }).limit(10);
    res.json(users);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
