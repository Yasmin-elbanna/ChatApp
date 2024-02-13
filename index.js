require('./public/db')

const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const { generateMsg } = require('./utilities')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./user-util')
const Message = require('./public/model'); // Import the Message model
const getMessagesByRoom = async (room) => {
    try {
        const messages = await Message.find({ room });
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 8080
const publicDirPath = path.join(__dirname, './public')

app.use(express.static(publicDirPath))

io.on('connection', (socket) => {
    console.log('New connection')
  
    
        socket.on('join', async ({ username, room }, callback) => {
            const { error, user } = addUser({ id: socket.id, username, room });
        
            if (error) return callback(error);
        
            socket.join(user.room);
            socket.emit('message', generateMsg('Administrator', 'Welcome to the chat app!'));
            socket.broadcast.to(user.room).emit('message', generateMsg('Administrator', `${user.username} has joined!`));
        
            // Get messages for the joined room from the database
            const messages = await getMessagesByRoom(user.room);
            socket.emit('output-messages', messages);
        
            io.to(user.room).emit('dataRoom', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        
            callback();
        });
        
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        // Create a new message object
        const newMessage = new Message({
            content: message,
            sender: user.username,
            room: user.room
        });   
        // Save the message to the database
        newMessage.save()
            .then(() => {
                io.to(user.room).emit('message', generateMsg(user.username, message));
                console.log('Message saved successfully:', newMessage);
                callback();
            })
            .catch(error => {
                console.error('Error saving message:', error);
                callback(error);
            });
     })
      

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)
        if (user) {
            io.to(user.room).emit('message', generateMsg(user.username, `${user.username} has left!`))
            io.to(user.room).emit('dataRoom', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})

server.listen(port, () => console.log(`Server is up on port ${port}!`))