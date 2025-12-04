const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
	if (!JWT_SECRET) return res.status(500).json({ error: 'JWT_SECRET not configured' });

	const authHeader = req.headers['authorization'] || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
	if (!token) return res.status(401).json({ error: 'No token provided' });

	try {
		const payload = jwt.verify(token, JWT_SECRET);
		req.user = payload; // { id, email, iat, exp }
		next();
	} catch (err) {
		return res.status(401).json({ error: 'Invalid token' });
	}
};