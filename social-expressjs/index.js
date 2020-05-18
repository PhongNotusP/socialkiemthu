require('./config/connect_database');
const { app } = require('./app');

const server = app.listen(process.env.PORT || 4000, () => console.log('Server started.'));
const io = require('socket.io').listen(server);
io.set('origins', '*:*');
io.on('connection', socket => {
    //Realtime khi vào phòng chat
    socket.on('CLIENT_ROOM', room => {
        socket.join(room);
    })

    socket.on('LEAVE_ROOM', (room) => {
        socket.leave(room);
    })

    //Xét id nếu giống phòng chat thì gửi lên
    socket.on('CLIENT_MESSAGE', message => {
        io.sockets.in(message.idRoom).emit('SERVER_MESSAGE', message);
    });
});