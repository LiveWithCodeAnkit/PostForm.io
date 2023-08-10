const { sendSuccessResponse, sendErrorResponse } = require("../utils/response");
const PlanModel = require("../models/plans.model");
const environment = require("../utils/environment");
const { stripe } = require("../helpers/stripe.helper");
const UserModel = require("../models/user.model");

exports.getAllPlans = async (req, res) => {
  try {
    const plans = await PlanModel.find().sort({ amount: 1 }).lean();
    sendSuccessResponse(res, { data: plans });
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

exports.createSession = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { planId } = req.body;
    const user = await UserModel.findById(userId)
      .select("+customer +session")
      .lean();
    const plan = await PlanModel.findById(planId).select("+price").lean();

    if (!plan) {
      return sendErrorResponse(res, "Invalid planId", 400);
    }
    if (plan?.amount === 0) {
      await UserModel.findByIdAndUpdate(userId, {
        plan: {
          selected: plan._id,
          isActive: true,
        },
      });
      return sendSuccessResponse(res, { data: { url: "/" } });
    }
    const price = await stripe.prices.retrieve(plan.price);

    if (!price) {
      return sendErrorResponse(res, "Invalid planId", 404);
    }
    let customerId = user?.customer;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user?.email,
        name: user?.firstName + " " + user?.lastName,
        metadata: {
          ref_id: user.id,
        },
      });
      customerId = customer?.id;
    }

    const session = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      client_reference_id: planId,
      customer: customerId,
      line_items: [
        {
          price: price.id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${environment.app.url}/callback?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${environment.app.url}/callback?status=cancel`,
      metadata: {
        planId: planId,
        priceId: price.id,
      },
    });
    await UserModel.findByIdAndUpdate(userId, {
      session: session.id,
      customer: customerId,
    });
    // console.log("link", session.url);
    sendSuccessResponse(res, { data: { url: session.url } });
    // res.redirect(303, session.url);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error.message);
  }
};

exports.openCustomerPortal = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const { returnUrl } = req.body;
    const user = await UserModel.findById(userId)
      .select("+customer +session")
      .lean();

    if (!user?.customer) {
      return sendErrorResponse(res, "No subscription found for this user", 400);
    }
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      user.session
    );

    const return_url = returnUrl || environment.app.url;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user?.customer,
      return_url: return_url,
    });
    // console.log(portalSession.url);
    sendSuccessResponse(res, { data: { url: portalSession.url } });
    // res.redirect(303, portalSession.url);
  } catch (error) {
    console.log(error);
    sendErrorResponse(res, error.message);
  }
};
