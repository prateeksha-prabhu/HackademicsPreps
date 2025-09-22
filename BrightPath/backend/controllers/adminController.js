import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate using environment variables
    if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET || 'fallbackSecret', { expiresIn: '1h' });

      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default loginAdmin;
