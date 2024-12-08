const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const users = require("./users");

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set in environment variables");
}

const login = async (username, password) => {
  const user = users.find((u) => u.username === username);
  if (!user) {
    throw new Error("Invalid username or password");
  }

  
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  
  const token = jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

const authenticate = (req) => {
  
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token && req.body.operationName !== "IntrospectionQuery") {
    throw new Error("Authentication token is missing");
  }
  if (token) {
    return jwt.verify(token, JWT_SECRET);
  }
  return null;
};

module.exports = { login, authenticate };
