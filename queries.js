const { User, Business } = require('./database');
const _ = require('lodash')

const listUsers = async (args) => {
  const users = await User.find({})
  return users
}

const getUserById = async (args) => {
  const { userId, username, email } = args
  const user = await User.findById(userId)
  return user
}
const getUserByName = async (args) => {
  const { username } = args
  const user = await User.findOne({ username })
  return user
}
const getUserByEmail = async (args) => {
  const { email } = args
  const user = await User.findOne({ email })
  return user
}
const listBusiness = async (args) => {
  const businesses = await Business.find({})
  return businesses
}
module.exports.queries = {
  listUsers,
  listBusiness,
  getUserById,
  getUserByName,
  getUserByEmail
}