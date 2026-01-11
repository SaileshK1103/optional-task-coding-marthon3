const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    occupation: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true, versionKey: false }
);

//add  virtual field id
userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
