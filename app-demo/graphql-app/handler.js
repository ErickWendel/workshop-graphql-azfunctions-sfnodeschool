// 'use strict';

// const {
//   ApolloServer,
//   gql
// } = require('apollo-server-azure-functions')

// const resolvers = {
//   Query: {
//     hello: (_, {
//       name
//     }) => ({ text: `hello ${name}`, id: Date.now()})
//   }
// }

// const schema = gql `
// type Query {
//   hello(name: String!): HelloReturn
// }

// type HelloReturn {
//   text: String
//   id: Int
// }
// `
// module.exports = new ApolloServer({
//   typeDefs: schema,
//   resolvers
// })

/* eslint-disable no-param-reassign */

module.exports.hello = function (context) {
  context.log('JavaScript HTTP trigger function processed a request.');

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: 'Go Serverless v1.x! Your function executed successfully!',
  };

  context.done();
};