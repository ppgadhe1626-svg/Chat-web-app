import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    description:{
        type: String
    },
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatDB'
    }],
    status:{
        type: String,
        required:true
    }


})

export const userDB = mongoose.model('userDB',userSchema)
