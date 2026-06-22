import mongoose from "mongoose";

export const chatSchema = new mongoose.Schema({
    chatname:{
        type: String
    },
    chatImage:{
        type: String
    },

    lastMessage:{
        type: String
    },
    messages:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'messageDB'
    }],
    unreadMessageCount:{
        type: Number
    },
    
    isGroupChat:{
        type: Boolean,
        required:true
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDB',
        required:true
    }],
    description:{
        type: String
    }
    
});

export const chatDB = mongoose.model('chatDB', chatSchema);
