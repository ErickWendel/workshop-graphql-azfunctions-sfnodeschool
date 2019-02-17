
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

// 1o import the graphql and azure dependencies
const {
    gql,
    ApolloServer
} = require('apollo-server-azure-functions')

// we got the connection string from mongodb
const MONGO_URL = 'mongodb://erickwendel:Erick123@cluster0-shard-00-00-xdg85.azure.mongodb.net:27017,cluster0-shard-00-01-xdg85.azure.mongodb.net:27017,cluster0-shard-00-02-xdg85.azure.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
// install mongodb - npm i mongodb
const {
 MongoClient,
 ObjectID
} = require('mongodb')
async function connect () {
    const connection =
         await MongoClient.connect(MONGO_URL, {
             useNewUrlParser: true
         })
    const heroes = connection
                        .db('heroes')
                        .collection('characters')
    return heroes
}

//2o in GraphQL world, we have a concept called by
// resolvers 
// the resolvers are responsible to map our request
// from request -> server
const resolvers = {
    // I want to get Heroes
    Query : {
        // parent => previous result from query
        // args => filter 
        // context => context of graphQL Global API
        // info => projection, root fields
        async getHeroes (parent, args, context) {
            // const { name } = args 
            // we can get all fields
            // to use as filter
            // is just pass to find function
            // and convert the _id to ObjectID


            const heroesCollection = context
                                        .db
                                        .heroes
                                        .find(args)
                                        .toArray()
            return heroesCollection
                                        // return [{
            //     name: 'Batman',
            //     power: ['money'],
            //     birthday: '1990-01-01'
            // }]
        }
    },
    Mutation: {
        async createHero(parent, args, context) {
            const {
                ops: [{
                    _id
                }]
            } = await context.db.heroes
                             .insertOne(args)
            return _id
        }
    }
}

const schema = gql`

 type Heroes {
     _id: ID
     name: String
     power: [String]
     birthday: String
 }

 type Query {
     getHeroes(
                name: String, 
               _id: ID,   
                power: String,
                birthday: String): [Heroes]
 }
 # Mutations are used to perform POST data
 # CREATE, UPDATE, DELETE
 type Mutation {
    createHero(
        name: String!,
        power: [String]!,
        birthday: String!
    ) : ID!
 }
`;
// instance of ApolloServer
// ApolloServer -> FRONT_END 
const server = new ApolloServer({
    resolvers,
    typeDefs: schema,
    // add logs
    formatError: (error) => {
        console.log('SO BAD!', error)
        return error
    },
    formatResponse: (res) => {
        console.log(res)
        return res
    },
    // injecting the Mongodb
    context: async() => {
        const heroes = await connect()
        return {
            db: { heroes }
        }
    }
})

//expose to azure function CLI
// we need to change the function.json
// on output field to $return
module.exports = server.createHandler()