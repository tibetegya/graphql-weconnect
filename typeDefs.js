const { gql } = require('apollo-server');

module.exports = gql`
type Country {
  name: String!
  code: String
}
type Image {
  url: String!
  description: String
}
type Rating {
  count: Int!
  total: Int!
  aggregate: Float!
}
type Address {
  building: String
  street: String!
  postalCode: String
  district: String
  region: String
  country: Country!
}
type Review {
  id: ID!
  description: String!
  author: User!
  likes: Int!
  dislikes: Int!
  replies: [Review]
  images: [Image]
  business: Business!

}
type Category {
  title: String!
  id: ID
}
type Business {
  id: ID!
  name: String!
  slug: String!
  address: Address!
  email: String
  category: Category!
  rating: Rating!
  phoneNumber: String
  reviews: [Review]
  socials: [SocialInfo]
  owner: User!
  logo: String
  images: [String]

}
type SocialInfo {
  platform: SocialPlatforms!
  url: String!
}
type User {
  id: ID!
  role: Role
  firstName: String!
  lastName: String!
  bio: String!
  username: String!
  socials: [SocialInfo]
  email: String!
  phoneNumber: String!
  profileImage: String
  gender: Genders
  businesses: [Business]
  reviews: [Review]
  address: Address
}
enum SocialPlatforms {
  FACEBOOK
  TWITTER
  LINKEDIN
  INSTAGRAM
}
enum Genders {
  MALE
  FEMALE
  OTHER
}
enum Role {
  ADMIN
  PUBLIC
  EDITOR
}
input CountryInput {
  name: String!
  shortName: String
}
input ImageInput {
  url: String!
  description: String
}
input SocialInfoInput {
  platform: SocialPlatforms!
  url: String!
}
input AddressInput {
  building: String
  street: String!
  postalCode: String
  district: String
  region: String
  country: CountryInput!
}
input UserInput {
  firstName: String!
  lastName: String!
  bio: String
  username: String!
  socials: [SocialInfoInput]
  email: String!
  phoneNumber: String
  profileImage: String
  gender: Genders
  address: AddressInput
}
input UserUpdateInput {
  firstName: String
  lastName: String
  bio: String
  username: String
  socials: [SocialInfoInput]
  phoneNumber: String
  profileImage: String
  gender: Genders
  address: AddressInput
}
input BusinessInput {
  name: String!
  address: AddressInput!
  email: String
  category: String!
  phoneNumber: String
  socials: [SocialInfoInput]
  logo: String
  images: [String]
}
input BusinessUpdateInput {
  name: String
  address: AddressInput
  email: String
  category: String
  phoneNumber: String
  socials: [SocialInfoInput]
  logo: String
  images: [String]
}
input ReviewInput {
  description: String!
  images: [ImageInput]
}
input ReviewUpdateInput {
  description: String
  images: [ImageInput]
}
type Exists {
  exists: Boolean!
}
type Deleted {
  status: String!
  id: ID!
  deleted: Boolean!
}
type Query {
  checkUsernameExists(username: String!): Exists
  checkUserEmailExists(email: String!): Exists
  login(username: String, email: String!, password: String!): User
  listUsers: [User]
  getUserById(userId: String!): User
  getUserByName(username: String!): User
  getUserByEmail(email: String!): User
  listBusiness: [Business]
  getBusiness(businessId: String): Business
}
type Mutation {
  register( user: UserInput!): User
  addUser(user: UserInput!): User
  editUser(userId: String!, user: UserUpdateInput): User
  deleteUser(userId: String!): Deleted

  addCategory(category: String!): Category
  addBusiness(business: BusinessInput): Business
  editBusiness(business: BusinessUpdateInput): Business
  deleteBusiness(businessId: String!): Deleted
  rateBusiness(businessId: String!, rating: Int!): Business

  addReview(businessId: String!, review: ReviewInput): Business
  replyToReview(reviewId: String!, review: ReviewInput): Business
  editReview(businessId: String!, reviewId: String!, review: ReviewUpdateInput): Review
  likeReview(businessId: String!, reviewId: String!): Review
  dislikeReview(businessId: String!, reviewId: String!): Review
  deleteReview(reviewId: String!): Deleted
}
`;
