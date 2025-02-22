import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    isNewPatient: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    password: {
      type: String,
      required: true, // password is required
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.pre("save", async function (next) {
  const patient = this;
  if (patient.isModified("password")) {
    patient.password = await bcrypt.hash(patient.password, 8);
  }
  next();
});

patientSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

patientSchema.methods.generateAcessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this._name,
      age: this._age,
      department: this._department,
      phoneNumber: this._phoneNumber,
      medicalHistory: this._medicalHistory,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

patientSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this._name,
      age: this._age,
      department: this._department,
      phoneNumber: this._phoneNumber,
      medicalHistory: this._medicalHistory,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Patient = mongoose.model("Patient", patientSchema);
