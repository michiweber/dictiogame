const path = require('path');
const crypto = require('crypto');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const rooms = {};

/* Set the view engine to ejs */
app.set('view engine', 'ejs');

/* Set up routes for HTML, CSS, and JavaScript files */
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/styles.css'));
});
app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/script.js'));
});
app.get('/socket.io.js', (req, res) => {
    res.sendFile(path.join(__dirname + '/node_modules/socket.io/client-dist/socket.io.js'));
});

io.on('connection', (socket) => {

    /* Username */
    const username = socket.handshake.query.username;

    /* Handle the entrance */
    if (socket.handshake.query.room === '') {
        /* Generate room id */
        const uuid = crypto.randomBytes(16).toString('hex');
        /* Generate room object */
        rooms[uuid] = {
            master: username,
            players: [],
            messages: [],
            rounds: []
        };
        /* Write username in room */
        rooms[uuid].players.push(username);
        /* Enter room */
        socket.join(uuid);
        /* Send room id */
        socket.emit('roomId', uuid);
        /* Broadcast the object */
        io.to(uuid).emit('roomUpdate', rooms[uuid]);
    } else if (rooms[socket.handshake.query.room] !== undefined) {
        /* Room id */
        const room = socket.handshake.query.room;
        /* Check if the username is already taken */
        if (rooms[room].players.indexOf(socket.handshake.query.username) !== -1) {
            socket.emit('error', 'Username has already been taken');
        } else {
            /* Write username in room */
            rooms[room].players.push(socket.handshake.query.username);
            /* Enter room */
            socket.join(room);
            /* Send room id */
            socket.emit('roomId', room);
            /* Broadcast the object */
            io.to(room).emit('roomUpdate', rooms[room]);
        }
    }

    /* Handle the disconnect */
    socket.on("disconnecting", () => {
        /* Room id */
        const room = socket.handshake.query.room;
        /* Write username in room */
        if (rooms[room] !== undefined) {
            rooms[room].players = rooms[room].players.filter(player => player !== socket.handshake.query.username);
        }
        /* Enter room */
        socket.leave(room);
        /* Broadcast the object */
        io.to(room).emit('roomUpdate', rooms[room]);
    });
});

/* Start the server on port 3000 */
const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});