const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "partner"],
      default: "user",
      required: true,
    },
  },
  {
    virtuals: true,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
      },
    },
  }
);
// Normal user case



UserSchema.virtual("pending-experiences", {
  ref: "Shelter",
  localField: "_id",
  foreignField: "partner",
});

UserSchema.virtual("confirmed-experiences", {
  ref: "Shelter",
  localField: "_id",
  foreignField: "partner",
});

// Partner case

UserSchema.virtual("confirmed-experiences", {
  ref: "Trip",
  localField: "_id",
  foreignField: "experience",
});

UserSchema.virtual("inReview-experiences", {
  ref: "Trip",
  localField: "_id",
  foreignField: "experience",
});


UserSchema.pre("save", function (next) {
  const user = this;

  if (user.isModified("password")) {
    bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      next();
    });
  } else {
    next()
  }
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password)
}
module.exports = mongoose.model("User", UserSchema);
