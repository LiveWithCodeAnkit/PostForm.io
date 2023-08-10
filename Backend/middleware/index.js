const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const middleware = [];

middleware.push(cors());
middleware.push(helmet());
middleware.push(compression());

module.exports = middleware;
