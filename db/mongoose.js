const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var db = mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/CustomerInfo',{
    useMongoClient: true
});

// module.exports = ()=>{
//     mongoose.connect('mongodb://localhost:27017/CustomerInfo',{
//      useMongoClient: true
//  }).then(connection=>{
//     return connection;
//  }).catch(err=>{
//      console.log('Failure to connect to database');
//      return err;
//      process.exit();
//  });
// }

module.exports = db;