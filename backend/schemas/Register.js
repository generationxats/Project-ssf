const mongoose = require('mongoose');


const registerSchema = new mongoose.Schema({

fname:{
    type:String,
    required:true
},

lname:{
    type:String,
    required:true
},

email:{
    type:String,
    required:true
},

number:{
    type:Number,
},

gender:{
    type:String,
},

status:{
    type:String,
},

location:{
    type:String,
},
    

},{timestamps:true})

const user = mongoose.model('registeredUsers',registerSchema);
module.exports = user;

