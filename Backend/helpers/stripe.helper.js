const Stripe = require("stripe");
const environment = require("../utils/environment");
const { secretKey } = environment.stripe;
const stripe = Stripe(secretKey);

module.exports = {
  stripe,
};
