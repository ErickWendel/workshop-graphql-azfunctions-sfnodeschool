const { gql } = require('apollo-server-azure-functions')
module.exports = gql`
scalar Date

type Query {
    # create a new hero
    getHeroes(_id: String, name: String): [Hero!]
}
type Mutation {
    # create a new hero
    createHero(power: [String!], birthday: Date, name: String): ID!
    
    # delete hero by ID
    deleteHero(_id: ID!): Boolean!

    ## test
    updateHero(_id: ID!, power: [String], birthday: Date, name: String): Boolean!

}
type Hero {
    _id: ID
    name: String
    power: [String]
    birthday: Date
}
`