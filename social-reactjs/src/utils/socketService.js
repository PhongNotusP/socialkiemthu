import io from 'socket.io-client';
let SOCKET_URL = 'http://localhost:4000';
export let socket = io.connect(SOCKET_URL);