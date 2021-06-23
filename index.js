const { ApolloServer, gql } = require('apollo-server');
const mutations = require('./resolvers')
const { queries } = require('./queries')
const typeDefs = require('./typeDefs')

const resolvers = {
  Query: {
    checkUsernameExists: () => { exists: false },
    checkUserEmailExists: () => { exists: false },
    login: () => {},
    listUsers: (_, args) => queries.listUsers(args),
    getUserById: (_, args) => queries.getUserById(args),
    getUserByName: (_, args) => queries.getUserByName(args),
    getUserByEmail: (_, args) => queries.getUserByEmail(args),
    listBusiness: (_, args) => queries.listBusiness(args),
    getBusiness: () => {},
  },
  Mutation: {
    register: (_, args) => mutations.register(args),
    addUser:  (_, args) => mutations.addUser(args),
    editUser: () => {},
    deleteUser: (_, args) => mutations.deleteUser(args),

    addCategory: (_, args) => mutations.addCategory(args),
    addBusiness: (_, args) => mutations.addBusiness(args),
    editBusiness: (_, args) => mutations.editBusiness(args),
    deleteBusiness: (_, args) => mutations.deleteBusiness(args),
    rateBusiness: (_, args) => mutations.rateBusiness(args),
    addReview: (_, args) => mutations.addReview(args),
    replyToReview: (_, args) => mutations.replyToReview(args),
    editReview: (_, args) => mutations.editReview(args),
    likeReview: (_, args) => mutations.likeReview(args),
    dislikeReview: (_, args) => mutations.dislikeReview(args),
    deleteReview: (_, args) => mutations.deleteReview(args),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});