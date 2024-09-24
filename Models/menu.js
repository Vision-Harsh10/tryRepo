const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    price :{
        type : Number,
        required :true,
    },
    taste :{
        type : String,
        required:true
    },
    is_drink:{
        type : Boolean,
        default:false,          
    },
    ingredients:{
        enum :[String],
        default : [],
    },
    num_sales:{
        type : Number,
        default: 0,
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

const MenuItem = mongoose.model('MenuItem',menuItemSchema);

module.exports={
    MenuItem
}