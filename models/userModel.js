const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified(this.password)) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePasswords = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.log(this.password);
    throw new Error("Comparison failed", error);
  }
};

const User = mongoose.model("User", userSchema);

module.exports = User;
