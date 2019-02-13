// class Resolvers {
//     static getResolvers(collection) {
//         return {
//             Query: {
//                 getHeroes: (_, args, context, info) => {
//                     return [{
//                         name: 'Aladin',
//                         power: ['strength', 'speed'],
//                         birthday: new Date().toISOString(),
//                         _id: `${Date.now()}`
//                     }]
//                 }
//             }
//         }
//     }
// }
// module.exports = Resolvers.getResolvers

const {
    graphqlMongodbProjection
} = require('graphql-mongodb-projection')

const { ObjectID } = require('mongodb')

class Resolvers {
    static getResolvers(collection) {
        return {
            Query: {
                getHeroes: async (_, args, context, info) => {
                    if(args._id) {
                        // don't do it in production!
                        args._id = ObjectID(args._id)
                    }

                    const projection = graphqlMongodbProjection(info)
                    return collection.find(args, projection).toArray()
                }
            },
            Mutation: {
                createHero: async (_, args) => {
                    const {
                        ops: [{
                            _id
                        }]
                    } = await collection.insertOne(args)
                    return _id
                },
            }
        }
    }
}
module.exports = Resolvers.getResolvers