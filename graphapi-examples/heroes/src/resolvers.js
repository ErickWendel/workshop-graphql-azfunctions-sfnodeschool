// const resolvers = {
//             Query: {
//                 getHeroes: (parentResult, args, context, info) => {
//                     return [{
//                         name: 'Aladin',
//                         power: ['strength', 'speed'],
//                         birthday: new Date().toISOString(),
//                         _id: `${Date.now()}`
//                     }]
//                 }
//             }
// }
// module.exports = resolvers

const {
    graphqlMongodbProjection
} = require('graphql-mongodb-projection')

const {
    ObjectID
} = require('mongodb')

const resolvers = {
    Query: {
        getHeroes: async (parentResult, args, context, info) => {
            if (args._id) {
                // don't do it in production!
                args._id = ObjectID(args._id)
            }

            const projection = graphqlMongodbProjection(info)
            return context.db.heroes.find(args, projection).toArray()
        }
    },
    Mutation: {
        createHero: async (parentResult, args, context) => {
            const {
                ops: [{
                    _id
                }]
            } = await context.db.heroes.insertOne(args)
            return _id
        },
        deleteHero: async (parentResult, {
            _id
        }, context) => {
            const id = new ObjectID(_id)
            const {
                result: {
                    n
                }
            } = await context.db.heroes.deleteOne({
                _id: id
            })
            return n
        },
        updateHero: async (parentResult, args, context ) => {
            const id = new ObjectID(args._id)
            delete args._id
            const {
                result: {
                    n
                }
            } = await context.db.heroes.updateOne({
                _id: id
            }, {
                $set: args
            })
            return n
        }
    }
}


module.exports = resolvers