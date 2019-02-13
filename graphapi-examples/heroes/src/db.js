const URI = 'mongodb://erickwendel:Erick123@ds247944.mlab.com:47944/agenda'

const {
    MongoClient,
    ObjectId
} = require('mongodb')


class Database {
    static async connect() {
        const connection = await MongoClient.connect(URI, {
            useNewUrlParser: true
        })
        
        const heroes = connection.db('agenda').collection('heroes')
        return {
            heroes
        }
    }
}

module.exports = Database