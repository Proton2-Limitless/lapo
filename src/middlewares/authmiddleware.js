import jwt from "jsonwebtoken";

export const authMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Token not provided." });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (!allowedRoles.includes(req.user.role)) {
        res.status(403).json({
          message: `Access denied. Only ${allowedRoles.join(
            ", "
          )} roles can access this route.`,
        });
        return;
      }

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error);

      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token has expired. Please log in again." });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token." });
      } else {
        return res
          .status(500)
          .json({ message: "An internal server error occurred." });
      }
    }
  };
};
