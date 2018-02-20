const mongoose = require('mongoose');
const express = require('express');
const bodyparser=require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT||3001;
var Schema = mongoose.Schema;
var db = require('./db/mongoose');
var Customer = require('./models/customer');
var app = express();
// var john = new Customer({
//     firstname: 'John',
//     lastname:'Doe',
//     email:'john.doe@example.com',
//     phone:'1234567890',
//     address:'10 Main Street, Columbus, Ohio'
// })
app.use(bodyparser.json());
app.post('/customer/create',(req, res)=>{
    var customer = new Customer(req.body);
    // bcrypt.hash(req.body.password,10,(err,hashed_pw)=>{
    //     customer.password = hashed_pw;
    //     //token = jwt.sign({email: customer.email,password: customer.password},'abc123');
    //     customer.save()
    //     .then(result => {
    //         res.json({status: 'Success',
    //             token: jwt.sign({email: customer.email,password: customer.password},'abc123')
    //         });
    //     })
    //     .catch(err => {
    //         res.status(400).send(err);
    //     });
    // });
        customer.GenerateJWTToken((result)=>{
            if(result.status == 'Success'){
                res.json(result);
            }else{
                res.status(400).send(result.ErrorDetails);
            }
      });
});

app.get('/customers',(req,res)=>{
        // jwt.verify(req.header('X-Auth'),'abc123',(err, decoded)=>{
        //     if(err){
        //         res.status(400).send(err);
        //     }else{
        //     Customer.find({})
        //     .then(result => res.status(200).send(result))
        //     .catch(err => res.status(400).send(err));
        //     }
        // })
    Customer.verifyJWTToken(req.header('X-Auth'))
    .then(result=>{
        return Customer.find({})
    })
    .then(result => {
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(400).send(err);
    });      
})

app.get('/customer/:id',(req,res) =>{
    Customer.verifyJWTToken(req.header('X-Auth'))
    .then(result =>{
        return Customer.findOne({"ID": req.params.id});
    })
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
})
app.patch('/customer/:id',(req,res)=>{
    Customer.verifyJWTToken(req.headers('X-Auth'))
    .then(result =>{
        req.body.update_timestamp = Date.now();
        return Customer.findOneAndUpdate({"ID": req.params.id},req.body)
    })
    
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err));
});
app.listen(PORT,()=>console.log('Express running on port',PORT));



























// app.get('/customer/:id',(req,res)=>{
//     Customer.findOne({"ID": req.params.id})
//     .then(result => res.status(200).send(result))
//     .catch(err => res.status(400).send(err));
// });

// app.patch('/customer/:id',(req,res)=>{
//     req.body.update_timestamp = Date.now();
//     Customer.findOneAndUpdate({"ID": req.params.id},req.body)
//     .then(result => res.status(200).send(result))
//     .catch(err => res.status(400).send(err));
// });



// john.save()
// .then(result => {
//     console.log(result);
//     mongoose.connection.close(() => console.log('connection closed'));
// })
// .catch(err => {
//     console.log('Exception while saving note',err);
//     mongoose.connection.close(() => console.log('connection closed'));
// });

// noteModel.find({})
// .then(result => console.log(result))
// .catch(err => console.log('Error', err));

// noteModel.findById('5a57286da2abe040d0b04466')
// .then(result => console.log(result));

// noteModel.findOne({"date":"Thu Jan 11 2018"})
// .then(result=>console.log(result.note));

// noteModel.findOneAndUpdate({"date":"Thu Jan 11 2018"},{"note":"Learning Mongoose and going good!"})
// .then(result => console.log(result));