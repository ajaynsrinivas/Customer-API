const mongoose = require('mongoose');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    ID: {
        type: Number,
        required:true,
        unique: true,
        default: parseInt(moment(new Date()).format('mmssSSS'))
    },
    firstname:{
        type: String,
        required:true,
    },
    lastname:{
        type: String,
    },
    email:{
        type:String,
        trim: true,
        required:true,
        unique:true,
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String
    },
    phone:{
        type:String,
        trim:true,
        required:true,
    },
    address:{
        type: String,
        required: true,
    },
    update_timestamp:{
        type:Date,
        default: Date.now()
    }
});

CustomerSchema.methods.GenerateJWTToken = function(callback){
    bcrypt.hash(this.password,10,(err,hashed_pw)=>{
        this.password = hashed_pw;
        this.save()
        .then((customer) => {
            var token = jwt.sign({email: customer.email,password: customer.password},'abc123');
            console.log(token);
            callback({status: 'Success',
                    token:token
                });
        })
        .catch((err) =>{
            callback({status:'Error',
                    ErrorDetails: err
                    });
        });
    });
};

CustomerSchema.statics.verifyJWTToken = function(token){
    var decoded;
    try{
        decoded = jwt.verify(token,'abc123');
        return Promise.resolve(decoded);//Customer.findOne({email: decoded.email});
    }catch(error){
        return Promise.reject(error);
    }
    
}

var Customer = mongoose.model('Customers',CustomerSchema);

module.exports = Customer;