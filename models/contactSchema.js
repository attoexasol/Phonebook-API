const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactInfoSchema = new Schema({
  type: { type: String, enum: ['mobile', 'home', 'work'] },
  number: String,
});

const ContactAddressSchema = new Schema({
  type: { type: String, enum: ['home', 'work'] },
  address: String,
});

// Define the Contact schema
const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumbers: [ContactInfoSchema],
  emailAddresses: [ContactInfoSchema],
  addresses: [ContactAddressSchema],
  birthdate: Date,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  creationDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
}, {timestamps: true});

// Define the Category schema
const CategorySchema = new Schema({
  name: { type: String, required: true },
},{timestamps: true});

// Create models for Contact and Group using the defined schemas
const Contact = mongoose.model('Contact', ContactSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = { Contact, Category };
