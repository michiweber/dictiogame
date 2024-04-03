const path = require('path');
const crypto = require('crypto');

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

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
    const uuid = crypto.randomBytes(16).toString('hex');
    socket.emit('uuid', uuid);
});

/* Start the server on port 3000 */
const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});