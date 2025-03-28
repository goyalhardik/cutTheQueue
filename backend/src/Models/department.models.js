import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hospital",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    head: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      trim: true,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Department = mongoose.model("Department", departmentSchema);
