const { gql } = require('apollo-server-azure-functions')
module.exports = gql`
scalar Date

type Query {
    getHeroes(_id: String, name: String): [Hero!]
}
type Mutation {
    createHero(power: [String!], birthday: Date, name: String): ID!
}
type Hero {
    _id: ID
    name: String
    power: [String]
    birthday: Date
}
`