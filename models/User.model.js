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
      enum: ["user", "admin"],
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
UserSchema.virtual("favorites", {
  ref: "Favorite",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("trips", {
  ref: "Trip",
  localField: "_id",
  foreignField: "user",
});

UserSchema.virtual("reserved-trips", {
  ref: "Shelter",
  localField: "_id",
  foreignField: "owner",
});

// Admin case

UserSchema.virtual("shelters", {
  ref: "Shelter",
  localField: "_id",
  foreignField: "owner",
});

UserSchema.virtual("Confirmed-trips", {
  ref: "Trip",
  localField: "_id",
  foreignField: "shelter",
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
