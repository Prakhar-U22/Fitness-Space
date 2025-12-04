const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
	throw new Error('JWT_SECRET not configured. Set JWT_SECRET in environment or .env file.');
}


router.post('/signup', async (req, res) => {
try {
const { username, email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Email and password required' });


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ error: 'Email already registered' });


const hashed = await bcrypt.hash(password, 10);
const user = new User({ username, email, password: hashed });
await user.save();


const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


router.post('/login', async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Email and password required' });


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ error: 'Invalid credentials' });


const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(400).json({ error: 'Invalid credentials' });


const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;