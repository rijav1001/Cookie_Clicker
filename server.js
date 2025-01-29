const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/clickerDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    userId: String,
    counter: Number,
    prizes: Number,
});

const User = mongoose.model('User', userSchema);

const getUser = async (userId) => {
    let user = await User.findOne({ userId });
    if (!user) {
        user = new User({ userId, counter: 0, prizes: 0 });
        await user.save();
    }
    return user;
};

app.post('/click', async (req, res) => {
    const { userId } = req.body;
    const user = await getUser(userId);
    let reward = 1;
    if (Math.random() < 0.5) reward += 9;
    if (Math.random() < 0.25) user.prizes += 1;
    user.counter += reward;
    await user.save();
    res.json({ counter: user.counter, prizes: user.prizes, reward });
});

app.get('/stats', async (req, res) => {
    const { userId } = req.query;
    const user = await getUser(userId);
    res.json({ counter: user.counter, prizes: user.prizes });
});

app.listen(8080, () => console.log('Server running on port 8080'));
