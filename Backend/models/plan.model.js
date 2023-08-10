const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecurringSchema = new Schema({
  interval: { type: String, default: "month" },
  interval_count: { type: Number, default: 1 },
  trial_period_days: { type: Number, default: 7 },
});

const PropsSchema = new Schema({
  /** Add props here. This props will be shown on pricing card */
});

const PlanSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    amount: { type: Number },
    currency: { type: String, default: "USD" },
    type: { type: String, default: "recurring" },
    recurring: {
      type: RecurringSchema,
      default: {},
    },
    product: { type: String, select: false },
    price: { type: String, select: false },
    props: { type: PropsSchema },
    meta: {},
  },
  {
    timestamps: true,
  }
);

const PlanModel = mongoose.model("plan", PlanSchema);

module.exports = PlanModel;
