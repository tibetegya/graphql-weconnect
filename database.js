const mongoose = require('mongoose');
const { Schema, model: Model } = mongoose;

const { DB_URL } = require('./constants')

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected!')
});

const AddressSchema = new Schema({
  building: String,
  street: String,
  postalCode: String,
  district: String,
  region: String,
  country: { name: String, code: String }
})

const CategorySchema = new Schema({
  title: String,
})

const RoleSchema = new Schema({
  name: String,
})
const UserSchema = new Schema({
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    firstName: String,
    lastName: String,
    bio: String,
    username: String,
    socials: [{ platform: String, url: String }],
    email: String,
    phoneNumber: String,
    profileImage: String,
    gender: String,
    businesses: [{ type: Schema.Types.ObjectId, ref: 'Business' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    address: AddressSchema
})

const BusinessSchema = new Schema({
  name: String,
  slug: String,
  address: AddressSchema,
  email: String,
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  rating: { count: Number, total: Number, aggregate: Number },
  phoneNumber: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  socials: [{ platform: String, url: String }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  logo: String,
  images: [String]
})

const ReviewSchema = new Schema({
  description: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: Number,
  dislikes: Number,
  replies: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  images: [{ url: String, description: String}],
  business: { type: Schema.Types.ObjectId, ref: 'Business' }
})

const Business = Model('Business', BusinessSchema)
const Review = Model('Review', ReviewSchema)
const User = Model('User', UserSchema)
const Category = Model('Category', CategorySchema)
const Role = Model('Role', RoleSchema)

module.exports = {
  db,
  Business,
  Review,
  User,
  Category,
  Role
}