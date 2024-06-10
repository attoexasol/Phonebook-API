const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumbers: [{
    type: { type: String, enum: ['mobile', 'home', 'work'], required: true },
    number: { type: String, required: true , unique: true}
  }],
  emailAddresses: [{
    type: { type: String, enum: ['personal', 'work'], required: true },
    email: { type: String, required: true , unique: true},
  }],
  addresses: [{
    type: { type: String, enum: ['home', 'work'], required: true },
    address: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      thana: { type: String, required: true },
      union: { type: String, required: true }
    }
  }],
  birthdate: Date,
  profile:  { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  creationDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

const CategorySchema = new Schema({
  name: { type: String, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', ContactSchema);
const Category = mongoose.model('Category', CategorySchema);

module.exports = { Contact, Category };
