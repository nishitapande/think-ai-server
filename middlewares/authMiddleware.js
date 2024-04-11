const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized: Missing token!",
    });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Unauthorized: Invalid token Fomat!",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        message: "Forbidden: Invalid token!",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
