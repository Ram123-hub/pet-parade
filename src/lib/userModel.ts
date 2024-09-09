// models/Pet.ts
import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    }, // Ensure age is stored as a number
    image_url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Pet = mongoose.models.pet || 
mongoose.model("pet", Schema);

const PetOfthemonth = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    story: { 
      type: String, 
      required: true 
    },
    achievements: { 
      type: [String], 
      required: true 
    },
    image_url: { 
      type: String, 
      required: true 
    },
    public_id: { 
      type: String, 
      required: true 
    },
  },
  {
    timestamps: true,
  }
);

export const Petofthemonths =
  mongoose.models.petofthemonth ||
  mongoose.model("petofthemonth", PetOfthemonth);





  const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          // Simple email regex validation
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please provide a valid email",
      },
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  });
  
  export const UserModel =
    mongoose.models.user || mongoose.model('user', UserSchema);