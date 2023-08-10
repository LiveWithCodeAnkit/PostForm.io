const jwt = require("jsonwebtoken");
const environment = require("../utils/environment");
const { sendErrorResponse } = require("../utils/response");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token =
      (authHeader && authHeader.split(" ")[1]) || req.cookies["token"] || "";
    if (!token) {
      sendErrorResponse(res, "Unauthorized Access", 401);
    } else {
      let decoded = jwt.decode(token);
      jwt.verify(token, environment.jwt.secret, async (err, user) => {
        if (err) {
          return sendErrorResponse(res, "Invalid Token or Expired", 401);
        }
        req.user = decoded;
        next();
      });
    }
  } catch (error) {
    sendErrorResponse(res, "Unauthorized Access", 401);
  }
};
