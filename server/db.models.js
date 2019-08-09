const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

// UNIQUE PROPERTY VALIDATOR
const mongooseUniqueValidator = require("mongoose-unique-validator");

// SUPER ADMIN SCHEMA
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});

// pre save functiion
UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// compare passwords
UserSchema.methods.comparePassword = function(plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

// SCHEMA BLUEPRINTS
const saccoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    uniqueSaccoCode: {
      type: String,
      required: true
    },
    address: {
      type: String
      // required: false
    },
    postal_code: {
      type: Number
    },
    registration_number: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      index: { unique: true }
    },

    telephone_number: {
      type: String,
      required: true,
      unique: true
    },
    membership: Number,
    date_founded: {
      type: Date,
      required: true
    },

    description: String,
    website: {
      type: String
    },
    created: {
      type: Date,
      default: new Date()
    },
    saccoLeaderFname: {
      type: String,
      requred: true,
    },
    saccoLeaderLname: {
      type: String,
      requred: true,
    },
    saccoLeaderPhoneNumber: {
      type: String,
      requred: true,
    },
    status: {
      type: String,
      default: "Active"
    },
    // username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    // ....
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { strict: false }
);

// RIDER SCHEMA
const riderSchema = new mongoose.Schema(
  {
    riderFname: {
      type: String,
      required: true
    },
    riderSurName: {
      type: String,
      required: true
    },
    riderLname: {
      type: String,
      required: true
    },
    riderTelNumber: {
      type: String,
      required: true,
      unique: true
    },
    drivingLicense:{
      type: String,
      required: true,
      unique:true
    },
   
    DLIssueDate:{
      type: Date,
      required: true
    },
    DLExpDate:{
      type:Date,
      required: true
    },
    riderPassportPhoto: {
      type: Buffer,
      required: false,
    },
    riderID: {
      type: String,
      required: true,
      unique: true,
    },
    riderBase:{
      type: String,
      required: true
    },
    riderResidence:{
      type: String,
      required: true
    },
    bikeOwnerFname: {
      type: String,
      required: true
    },
    bikeOwnerLname: {
      type: String,
      required: true,
    },
    bikeOwnerResidence:{
      type: String,
      reqiured: true
    },
     bikeOwnerID: {
      type: Number,
      required: true,
    },
    bikeOwnerTelNumber: {
      type: String,
      required: true
    },
    motorBikeMake: {
      type: String,
      required: true,
    },
    motorBikeBrand: {
      type: String,
      required: true,
    },
 
    insuranceNumber: {
      type: String,
      // required: true,
      unique: true,
    },
    insuranceIssueDate: {
      type: Date,
      required: true,
      // default: new Date(),
    },
    insuranceExpDate: {
      type: Date,
      required: true,
      // default: new Date(),
    },
    numberPlate: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: text => text.indexOf("K") === 0,
        message: "Invalid number plate"
      }
    },
    // revisit
   
   
    created: {
      type: Date,
      default: new Date()
    },
    // react states
    status: {
      type: String,
      default: "Active"
    },
    // TODO challenge on how to implement ratings on the riders
    ratings: {
      type: Number,
      min: 0,
      max: [5, "Number of stars cannot exceed 5"]
    },

    // THIS IS WHERE WE REFERENCE THE RIDER TO THEIR RESPECTIVE SACCOS
    sacco: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sacco"
    }
  },
  { strict: false }
);
// USING PLUGINS T
saccoSchema.plugin(mongooseUniqueValidator);
riderSchema.plugin(mongooseUniqueValidator);

// CREATING AND SAVING MONGOOSE MODEL
// THIS CAN ALSO BE EXPORTED TO ANOTHER MODULARISED FILE
const Sacco = mongoose.model("Sacco", saccoSchema);
const Rider = mongoose.model("Rider", riderSchema);
const UserModel = mongoose.model("user", UserSchema);

// ++INSERTING SOME DATA INTO THE DATABASE++

module.exports = {
  Sacco,
  Rider,
  UserModel
};
