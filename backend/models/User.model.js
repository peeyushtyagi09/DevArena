const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    status: {
      type: String, 
      enum: ["UNVERIFIED", "ACTIVE"],
      default: "UNVERIFIED",
    },
    role: {
      type: String, 
      enum: ["USER", "ADMIN"], 
      default: "USER",
    },
    lastLoginAt: {
      type: Date, 
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// This creates a unique index on the email field in MongoDB, 
// ensuring that no two users can have the same email address; 
// this enforces the uniqueness constraint at the database level for better integrity and query performanc
userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// This defines a custom toJSON method for user documents, which removes the password 
// field when a user object is converted to JSON (e.g., when sending user data in API responses). 
// This helps prevent accidental exposure of hashed passwords.
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();

  delete userObject.password;

  return userObject;
}



module.exports = mongoose.model("User", userSchema);
