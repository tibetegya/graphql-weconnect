const { User, Business, Category, Review } = require('./database');
const _ = require('lodash');
const uds = require('underscore.string')
const r = require('ramda');

const caps = r.compose(_.capitalize, uds.clean)
const lower = r.compose(_.lowerCase, uds.clean)
const slugify = r.compose(uds.slugify, uds.clean)

const OTHER = 'other'
const OWNER_ID = '60d35bbfb19575819e5f7c74'


module.exports.register = function (_, args) {
console.log('args', args)
  return args.user

}

module.exports.addUser = async function (args) {
  const { user } = args
  const exists = await User.exists({ username: user.username.toLowerCase() })
  if (exists) return null
  const dbUser = await User.create({
    ...user,
    username: lower(user.username),
    firstName: caps(user.firstName),
    lastName: caps(user.lastName)
  })
  return dbUser
}

module.exports.deleteUser = async function (args) {
  const { userId } = args
  const res = await User.deleteOne({ id: userId })
  const deleted = res.deleteCount > 0
  return {
    status: !deleted ? 'ERROR' : 'SUCCESS',
    id: userId,
    deleted
  }
}

module.exports.addCategory = async function (args) {
  const category = caps(args.category)
  const exists = await Category.exists({ title: category })
  if (exists) return null
  const dbCategory = await Category.create({ title: category })
  return dbCategory
}
module.exports.addBusiness = async function (args) {
  const { business } = args
  const { name, category, email, address, phoneNumber, socials, logo, images  } = business
  const exists = await Business.exists({ name: caps(name) })
  if (exists) return null
  const ownerId = await User.findById(OWNER_ID)
  const dbCategory = await Category.findOne({ title: caps(category) })
  let businessCategory = dbCategory
  if (!dbCategory) {
    businessCategory = await Category.findOne({ title: caps(OTHER) })
  }
  const dbBusiness = await Business.create({
    name: caps(name),
    slug: slugify(name),
    category: businessCategory.id,
    email,
    address,
    owner: ownerId,
    phoneNumber,
    socials,
    logo,
    images,
    rating: { count: 0, total: 0, aggregate: 0 }
  })
  
  return dbBusiness
}
module.exports.editBusiness = async function (args) {
  return null
}
module.exports.deleteBusiness = async function (args) {
  const { businessId } = args
  const deleted = await Business.findByIdAndDelete(businessId)
  return {
    status: !deleted ? 'ERROR' : 'SUCCESS',
    id: businessId,
    deleted: !!deleted
  }
}
module.exports.rateBusiness = async function (args) {
  const { businessId, rating } = args
  if (rating > 5 || rating < 1) return null
  return Business.findById(businessId, (err, doc) => {
    if(err) return null
    doc.rating = {
      count: doc.rating.count + 1,
      total: doc.rating.total + rating,
      aggregate: Number((doc.rating.total + rating) / (doc.rating.count + 1)).toFixed(1)
    }
    return doc.save()
  })
}
module.exports.addReview = async function (args) {
  return null
}

module.exports.replyToReview = async function (args) {
  return null
}

module.exports.editReview = async function (args) {
  return null
}

module.exports.likeReview = async function (args) {
  const { reviewId } = args
  return Review.findById(reviewId, (err, doc) => {
    if(err) return null
    doc.likes += 1
    return doc.save()
  })
}

module.exports.dislikeReview = async function (args) {
  const { reviewId } = args
  return Review.findById(reviewId, (err, doc) => {
    if(err) return null
    doc.dislikes += 1
    return doc.save()
  })
}
module.exports.deleteReview = async function (args) {
  const { reviewId } = args
  const res = await Review.deleteOne({ id: reviewId })
  const deleted = res.deleteCount > 0
  return {
    status: !deleted ? 'ERROR' : 'SUCCESS',
    id: reviewId,
    deleted
  }
}