import jwt from 'jsonwebtoken';

const authAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Not authorized. Please log in again." });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbackSecret');

    if (decoded.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ success: false, message: "Not authorized. Invalid token." });
    }

    next();
  } catch (error) {
    console.error("Error during admin authentication:", error);
    res.status(401).json({ success: false, message: "Invalid or expired token. Please log in again." });
  }
};

export default authAdmin;
