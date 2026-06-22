import mongoose from 'mongoose'

const messageSchema = mongoose.Schema({
    message:{
        type: String,
        required:true 
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDB',
        required:true
    },
    sentTime:{
        type: Date,
        required:true
    },
    receivedTime:{
        type: Date
    },
    isReceived:{
        type: Boolean
    },
    isRead:{
        type: String
    },
    attachments:{
        type: String
    }
})

export const messageDB = mongoose.model("messageDB", messageSchema);
