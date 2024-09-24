const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number,
    },
    work:{
        type : String,
        enum : ['chef','waiter','manager'],
    },
    mobile:{
        type :String,
        required : true
    },
    email:{
        type:String,
        required:true, 
    },
    address:{
        type : String,
    },
    salary:{
        type : Number,
        requied :true
    },
    username:{
        type:String,
        requied:true,
    },
    password:{
        type:String,
        requied:true,
    }
});

// personSchema.pre('save', async function(next){
//     const person = this;
//     if(!person.isModified('password')) return next();
     
//     try{
//         // hash password generate
//         const salt = await bcrypt.genSalt(10);

//         // hash password
//         const hashedPassword = await bcrypt.hashedPassword(person.password,salt);
//         person.password = hashedPassword;

//         next();
//     }catch(err){

//     }
// })
// Create Person model
const Person = mongoose.model('Person',personSchema);

module.exports={
    Person
}