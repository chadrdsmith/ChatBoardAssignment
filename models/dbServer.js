let mongoose = require('mongoose');

const server = '127.0.0.1:20084'; 
const database = 'a3';   

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
     mongoose.connect(`mongodb://${server}/${database}`, {useNewUrlParser: true})
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}

module.exports = new Database()