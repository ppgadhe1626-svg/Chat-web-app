import express from 'express'
import { getAllChats, getChat, createPrivateChat, createGroupChat, deleteChat, clearChat} from '../controllers/chatController.js'

export const chat_routes = express.Router()

chat_routes
.get('/allChats',getAllChats)
.get('/chat/:chat_id', getChat)
.post('/create-private-chat', createPrivateChat)
.post('/create-group-chat', createGroupChat)
.delete('/delete', deleteChat)
.delete('/clear', clearChat)
