const { gql } = require('apollo-server-azure-functions')
module.exports = gql`
scalar Date

type Query {
    getHeroes(_id: String, name: String): [Hero!]
}
type Mutation {
    createHero(power: [String!], birthday: Date, name: String): ID!
    
    deleteHero(_id: ID!): Boolean!

    updateHero(_id: ID!, power: [String], birthday: Date, name: String): Boolean!

}
type Hero {
    _id: ID
    name: String
    power: [String]
    birthday: Date
}
`