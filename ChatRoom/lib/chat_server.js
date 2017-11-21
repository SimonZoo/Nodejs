var socketio = require('socket.io');

var io;
var guestNumber = 1;
var nickNames = {};
var nameUsed = [];
var curRoom = {};

function assignGuestName(socket, guestNumber, nickNames, nameUsed) {
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name; //?
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    nameUsed.push(name);
    return guestNumber + 1;
}

function joinRoom(socket, room) {
    socket.join(room);
    curRoom[socket.id] = room;
    socket.emit('joinResult', {room: room});
    socket.broadcast.to(room).emit('message', {
        text: '| ' + nickNames[socket.id] + ' has joined ' + room + '. |' 
    });
    var userInRoom = io.sockets.clients(room);
    if (userInRoom.length > 1) {
        var userInRoomSummary = '| Users currently in ' + 'room' + ':';
        for (var i in userInRoom) {
            var userSocketId = userInRoom[i].id;
            if (userSocketId != socket.id) { // ?
                if (i > 0) userInRoomSummary += ',';
                userInRoomSummary += nickNames[userSocketId];
            }
        }
        userInRoomSummary += '. |';
        socket.emit('messagr', {text: userInRoomSummary});
    }
}

function handleNameChangeAttempts(socket, nickNames, nameUsed) {
    socket.on('nameAttempt', function (name) {
        if (name.indexOf('Guest') == 0) {
            socket.emit('nameResult', {
                success: false,
                message: '| Names cannot begin with "Guest" |'
            });
        } else {
            if (nameUsed.indexOf(name) == -1) { // 在nameUsed中没找到name 说明改名字没有被人占用
                var prevName = nickNames[socket.id];
                var prevNameIndex = nameUsed.indexOf(prevName);
                nameUsed.push(name); //在nameUsed中加入用户的新名字，这里的名字和下标不是一一对应的
                nickNames[socket.id] = name;
                delete nameUsed[prevNameIndex];
                socket.emit('nameResult', {
                    success: true,
                    name: name
                });
                socket.broadcast.to(curRoom[socket.id]).emit('message', {
                    text: '| ' + prevName + ' is now known as ' + name + '. |'
                });
            } else {
                socket.emit('nameResult', {
                    success: false,
                    message: '| That name is already in use. |' 
                });
            }
        }
    });
}

function handleMessageBroadcasting(socket) {
    socket.on('message', function (message) {
        socket.broadcast.to(message.room).emit('message', {
            text: nickNames[socket.id] + ' : ' + message.text
        });
    });
}

function handleRoomJoining(socket) {
    socket.on('join', function (room) {
        socket.leave(curRoom[socket.id]);
        joinRoom(socket, room.newRoom);        
    });
}

function handelClientDisconnection(socket) {
    socket.on('disconnect', function() {
        var nameIndex = nameUsed.indexOf(nickNames[socket.id]);
        delete nickNames[socket.id];
        delete nameUsed[nameIndex];
    });
}

exports.listen = function (server) {
    io = socketio.listen(server); // 启动Socket.IO服务器，允许它搭载在已有的HTTP服务上
    io.set('Log level', 1); //?
    console.log('Here.1.');
    io.sockets.on('connection', function (socket) {
        guestNumber = assignGuestName(socket, guestNumber, nickNames, nameUsed);
        joinRoom(socket, 'Lobby');
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, nameUsed);
        handleRoomJoining(socket);
        socket.on('rooms', function () {
            socket.emit('rooms', io.sockets.manager.rooms);//?
        });
        handelClientDisconnection(socket, nickNames, nameUsed);
    });
};

