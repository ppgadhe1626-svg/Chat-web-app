import { chatDB } from '../models/chatDB.js';
import { messageDB } from '../models/messageDB.js';
import { userDB } from '../models/userDB.js';

export const getAllChats = async(req, res) =>{
    try {
        
        chat_arr = await chatDB.find().populate('chats');
            
        return res.json({
            messages : chat_arr
        })
    } catch (error) {
        return res.json({
            errorMessage: `Chat retrival failed with the following error: ${error}`
        })
    }
}

export const getChat = async(req, res) =>{
    try {
        console.log(req);
        const {chat_id} = req.params;
        if(!chat_id){ 
            return res.json({
                errorMessage: "Please give a Chat Id"
            })
        }
        const chat = await chatDB.findById(chat_id).populate('messages')
            
        return res.json({
            message : chat
        })
    } catch (error) {
        return res.json({
            errorMessage: `Chat retrival failed with the following error: ${error}`
        })
    }
}

// Create a private chat
export const createPrivateChat = async (req, res) => {
    try {
        console.log('private-chat')
        const { user_ids } = req.body; // Extract user IDs from request params
        // const user_ids = user_ids.split(','); // Convert comma-separated IDs into an array
        console.log(user_ids)
        if (user_ids.length !== 2) {
            return res.json({
                errorMessage: "Private chat must have exactly 2 participants.",
            });
        }

        // Create a new private chat entry in chatDB
        const newChat = await chatDB.create({
            isGroupChat: false,
            members: user_ids,

        });
        console.log(newChat)

        // Update each user's chat list
        await Promise.all(
            user_ids.map(async (userId) => {
                await userDB.findByIdAndUpdate(userId, {
                    $push: { chats: newChat._id },
                });
            })
        );

        return res.json({
            message: "Private chat created successfully.",
            chat: newChat,
        });
    } catch (error) {
        return res.json({
            errorMessage: `Failed to create private chat: ${error.message}`,
        });
    }
};

// Create a group chat
export const createGroupChat = async (req, res) => {
    try {
        const { user_ids, name } = req.body; // Extract user IDs from request params
        // const user_ids = user_ids.split(','); // Convert comma-separated IDs into an array
        // console.log(user_ids, name)
        if (user_ids.length < 2) {
            return res.status(400).json({
                errorMessage: "Group chat must have at least 2 participants.",
            });
        }

        // Create a new group chat entry in chatDB
        const newChat = await chatDB.create({
            isGroupChat: true,
            members: user_ids,
            chatname: name
        });
        console.log(newChat)

        // Update each user's chat list
        await Promise.all(
            user_ids.map(async (userId) => {
                await userDB.findByIdAndUpdate(userId, {
                    $push: { chats: newChat._id },
                });
            })
        );

        return res.status(201).json({
            message: "Group chat created successfully.",
            chat: newChat,
        });
    } catch (error) {
        return res.status(500).json({
            errorMessage: `Failed to create group chat: ${error.message}`,
        });
    }
};

export const deleteChat = async (req, res) => {
    try {
        console.log(req.body);
        // console.log("HI");
        const {chat} = req.body;
        
        // Update each user's chat list
        await Promise.all(
            chat.members.map(async (userId) => {
                await userDB.findByIdAndUpdate(userId, {
                    $pull: { chats: chat._id },
                });
            })
        );
        console.log("HI");
    
        await Promise.all(
            chat.messages.map(async (msg_id) => {
                await messageDB.findByIdAndDelete(msg_id)
            })
        )
        await chatDB.findByIdAndDelete(chat._id);
        return res.json({
            message: "Chat deleted successfully"
        })
    } catch (error) {
        return res.json({
            errorMessage: `Failed to delete the chat with the following error: ${error}`
        })
    }
}

export const clearChat = async (req, res) => {
    try {
        const {chat} = req.body;    
    
        await Promise.all(
            chat.messages.map(async (msg_id) => {
                await messageDB.findByIdAndDelete(msg_id)
                await chatDB.findByIdAndUpdate(chat._id, {
                    $pull :{messages: msg_id}
                })
            })
        )
        // chat.messages = [];
        // console.log(chat)
        // await chat.save()

        return res.json({
            message: "Chat cleared successfully"
            // chat: chat
        })
    } catch (error) {
        return res.json({
            errorMessage: `Failed to clear the chat with the following error: ${error}`
        })
    }
}
