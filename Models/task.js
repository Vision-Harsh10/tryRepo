const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
    type: String,
    reqiured : true,
    },
    description:{
        type: String,
        requried: true,
    },
    priority:{
        type: String,
        required: true,
        default: false,
    },
    dueDate:{
        type : Date,
        required: true,
    }
});

const TaskList = mongoose.model('TaskList',TaskSchema);

module.exports={
    TaskList
}