const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Validate required environment variables before starting
const { MONGO_URI, JWT_SECRET } = process.env;
if (!MONGO_URI) {
	console.error('Error: MONGO_URI is not set in environment. Set MONGO_URI in .env');
	process.exit(1);
}
if (!JWT_SECRET) {
	console.error('Error: JWT_SECRET is not set in environment. Set JWT_SECRET in .env');
	process.exit(1);
}

// Connect to MongoDB
mongoose
	.connect(MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => {
		console.error('MongoDB connection error:', err);
		process.exit(1);
	});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Example protected route
const authMiddleware = require('./middleware/auth');

app.get('/', (req, res) => {
//   console.log("hello");
  res.send("Hello from the backend!");
});

app.get('/api/protected', authMiddleware, (req, res) => {
	res.json({ message: `Hello ${req.user.id}, this is protected.` });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));