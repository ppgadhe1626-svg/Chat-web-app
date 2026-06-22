import express from 'express'
import {messageDB} from '../models/messageDB.js'
import {chatDB} from '../models/chatDB.js'

export const sendMessage = async(req, res) =>{
   try {
     const {message, sender, chat_id} = req.body;
     let now = new Date();
     const new_message = await messageDB.create({
         message: message,
         sender: sender,
         sentTime: now
     })
    //  console.log(new_message)
     let chat = await chatDB.findByIdAndUpdate(chat_id, {
        $push: {messages: new_message._id}
     },{new: true}).populate('messages');

    //  console.log('chat: ',chat)
     ////////// TODO : SOCKET IMPLEMENTATION ////////////


     return res.json({
        message: "Message was sent succesfully",
        chat: chat
     })
   } catch (error) {
    return res.json({
        message: "Something Went wrong when storing the message. Please try again"
    })
   }
}

export const getAllMessage = async(req, res) =>{
    const {chat_id} = req.body
    if(!chat_id){ return res.body = {
        errorMessage: "Please give a Chat Id"
    }}
    msg_arr = await chatDB.findById(chat_id).populate('messages');
    
    return res.json({
        messages : msg_arr.messages
    })
}

export const editMessage = async(req, res) =>{
    
}

export const deleteMessage = async(req, res) =>{
    
}

export const deleteAllMessagesFromDatabase = async (req, res) => {
    try {
        // Delete all documents from the messageDB collection
        await messageDB.deleteMany({});

        return res.json({
            message: "All messages have been deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            errorMessage: `Failed to delete all messages: ${error.message}`,
        });
    }
};
