const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'theBiggestSecretKeyToEverLive';

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(403).json({ message: 'Invalid token' });
    }

};


exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.tipo;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    next();
  };
};
