import express from 'express'
import { deleteMessage, editMessage, getAllMessage, sendMessage, deleteAllMessagesFromDatabase } from '../controllers/messageController.js';

export const message_routes = express.Router();

message_routes.post('/send', sendMessage)
.get('/:chat_id', getAllMessage)
.put('/edit/:chat_id', editMessage)
.delete('/delete/:chat_id', deleteMessage)
.delete('/deleteAllMessagesFromDatabase', deleteAllMessagesFromDatabase)
