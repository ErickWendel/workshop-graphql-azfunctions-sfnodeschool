™'use strict';

const {
  ApolloServer,
  gql
} = require('apollo-server-azure-functions')

const resolvers = {
  Query: {
    hello: (_, {
      name
    }) => ({ text: `hello ${name}`, id: Date.now()})
  }
}

const schema = gql `
type Query {
  hello(name: String!): HelloReturn
}

type HelloReturn {
  text: String
  id: Float
}
`
const server = new ApolloServer({
    typeDefs: schema,
    resolvers
})
module.exports = server.createHandler()

// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     if (req.query.name || (req.body && req.body.name)) {
//         context.res = {
//             // status: 200, /* Defaults to 200 */
//             body: "Hello " + (req.query.name || req.body.name)
//         };
//     }
//     else {
//         context.res = {
//             status: 400,
//             body: "Please pass a name on the query string or in the request body"
//         };
//     }
// };