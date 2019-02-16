'use strict';

const {
    ApolloServer,
    // gql
} = require('apollo-server-azure-functions')
const resolvers = require('./src/resolvers')
const schema = require('./src/schemas')
const Db = require('./src/db')


async function main() {
         
        const server = new ApolloServer({
            resolvers,
            typeDefs: schema,
            context: async () => {
                const {
                    heroes
                } = await Db.connect()
                return { db: { heroes } }
            },
            formatError: error => {
                console.log('Error***', error);
                return error;
            },
            formatResponse: response => {
                console.log(response);
                return response;
            },
        })
        return server
}
// const resolvers = {
//     Query: {
//         hello: (_, {
//             name
//         }) => ({
//             text: `hello ${name}`,
//             id: Date.now()
//         })
//     }
// }

// const schema = gql `
// type Query {
//   hello(name: String!): HelloReturn
// }

// type HelloReturn {
//   text: String
//   id: Float
// }
// `

module.exports = (context, req) => {
    main()
        .then(server => 
            server.createHandler()(context, req)
        )
}