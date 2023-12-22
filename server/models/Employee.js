//Employee.js
import mongoose from "mongoose";

const loginSchema = mongoose.Schema({
    username: {
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
});

// Example: Making the 'district', 'area', and 'buildingType' fields optional
const buildingConstructionSchema = mongoose.Schema({
    name:{
        type :String,
        required: true,
    },
    district: {
      type: String,
      
    },
    area: {
      type: String,
      
    },
    siteno: {
      type: Number, // Change the type if needed
      
    },
    buildingType: {
      type: String,
      
    },
});

const cropLoanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    AccountNo: {
      type: Number,
      required: true,
    },
    Phonenumber: {
      type: String,
      required: true,
    },
    AcresofLand: {
      type: Number,
      required: true,
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
});

const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  propertyID: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  kathaType: {
    type: String,
    enum: ['A-KATHA', 'B-KATHA'],
    default: 'A-KATHA',
    required: true,
  },
});

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  collegeidno: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  caste: {
    type: String,
    required: true,
  },
  income: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: String, 
    required: true,
  },
});

const soilTestingSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
  },
  email: {
      type: String,
      required: true,
  },
  phoneNumber: {
      type: Number,
      required: true,
  },
  districtName: {
      type: String, 
      required: true,  // Ensure this field is marked as required
  },
});


export const SoilTesting = mongoose.model('SoilTesting', soilTestingSchema);
export const Scholarship = mongoose.model('Scholarship', scholarshipSchema);
export const Property = mongoose.model('Property', propertySchema)
export const Login = mongoose.model('Login', loginSchema);
export const BuildingConstruction = mongoose.model('BuildingConstruction', buildingConstructionSchema);
export const CropLoan = mongoose.model('CropLoan', cropLoanSchema);