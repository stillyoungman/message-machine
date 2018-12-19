const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const anonIo = io.of('/nameless');
const authIo = io.of('/auth');
const path = require('path');
const uuid = require('uuid/v1');
const helpers = require('./helpers.js')

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

let currentUser = {}

anonIo.on('connection', (socket) => {
    socket.on('auto-enter', (key) => {
        currnetUser = helpers.getUserByKey(key);
        if (!currentUser) {
            socket.emit('not-valid')
        } else socket.emit('success', currentUser);
    });
    socket.on('set-username', (username) => {
        //validateUsername()!
        // if(username.toLowerCase().contains("anton")) return;
        let user = {
            key: `${socket.id.substring(10)}:${uuid()}`,
            username,
        }
        socket.username = username;
        console.log("username", username)
        currentUser = user;
        helpers.createUser(user);
        socket.emit('success', user);
    });
})

authIo.on('connection', (socket) => {
    socket.on('chat-message', function (data) {
        currentUser = helpers.getUserByKey(data.key);
        let post = {
            msg: data.msg,
            username: currentUser.username
        }
        authIo.emit('chat-message', JSON.stringify(post));
        console.log(post);
    })

})

server.listen(3000, () => console.log("\nlisten on port: 3000\n"));