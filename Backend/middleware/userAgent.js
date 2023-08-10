const useragent = require("useragent");
const requestIp = require("request-ip");

module.exports = (req, res, next) => {
  const userAgentString = req.get("User-Agent");
  var host = req.get("host");
  const clientIp = requestIp.getClientIp(req);
  req.userAgent = useragent.parse(userAgentString);
  req.clientIp = clientIp;
  req.hostname = host;
  next();
};
