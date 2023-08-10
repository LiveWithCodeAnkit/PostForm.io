const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const constants = require("../utils/constants");

const Schema = mongoose.Schema;

const PlanSchema = new Schema(
  {
    selected: { type: mongoose.Types.ObjectId, ref: "plan" },
    isActive: { type: Boolean },
  },
  {
    _id: false,
  }
);

const UserSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: constants.user.roles,
      default: constants.roles.user,
    },
    isEmailVerified: { type: Boolean, default: false },
    customer: { type: String, select: false }, // stripe customerId
    subscription: { type: Object, select: false },
    session: { type: String, select: false },
    plan: { type: PlanSchema },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(" "));
    const lastName = v.substring(v.indexOf(" ") + 1);
    this.set({ firstName, lastName });
  });

UserSchema.methods.comparePassword = function comparePassword(
  plainPassword,
  next
) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    next(err, isMatch);
  });
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
