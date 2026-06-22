export const ConnectSocketIO = (io) => {
    return io.on('connection', (socket) => {
        console.log('a user connected');
        


        socket.on('join room', (user) => {
            console.log('You joined room');
            user?.chats.map((chat) =>{
              console.log(chat);
                socket.join(`${chat}`)
            })
        });

        socket.on('send message', (msg, chat_id) => {
            console.log('message: ' + msg, chat_id);
            io.to(`${chat_id}`).emit('receive message', msg, chat_id);
        });
