const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports. protect = async (req, res, next) => {
  let token;

  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer ')) {
    token = auth.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch  {
    return res.status(401).json({ ok: false, message: 'Token invalid or expired' });
  }
};

// Optional role guard
exports.restrictTo = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ ok: false, message: 'Forbidden' });
  }
  next();
};
