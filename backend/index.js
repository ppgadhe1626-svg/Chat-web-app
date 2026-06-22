import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import {user_routes} from './routes/user_routes.js'
import {chat_routes} from './routes/chat_routes.js'
import {message_routes} from './routes/message_routes.js'
import { ConnectSocketIO } from './controllers/socketIO.js'

const app = express()
const server = http.createServer(app);
const io = new Server(server,{
    cors : "*"
});

const connectDB = () => {
    mongoose.connect(`mongodb+srv://Rahul_Singh:${process.env.MongoDB_Key}@cluster0.bmhg9ho.mongodb.net/`).then(() => {
        console.log('DB connected')
    }).catch((e) => console.log('Error connecting DB', e))
}

connectDB()
ConnectSocketIO(io);

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))


app.use('/user', user_routes)
app.use('/chat', chat_routes)
app.use('/message', message_routes)

server.listen(8000, () => {
    console.log('Server connected')
})
