const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Crear la aplicación de Express
const app = express();
const server = http.createServer(app);

// Inicializar Socket.io
const io = socketIo(server);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));  // Asegúrate de tener este archivo en la raíz
});

// Conexión de Socket.io
io.on('connection', (socket) => {
    console.log('Un usuario se ha conectado');
    
    // Recibir mensaje del cliente
    socket.on('newMessage', (message) => {
        console.log('Mensaje recibido:', message);
        
        // Enviar el mensaje a todos los clientes conectados
        io.emit('newMessage', message);
    });

    // Evento de desconexión
    socket.on('disconnect', () => {
        console.log('Un usuario se ha desconectado');
    });
});

// Puerto de escucha
const port = 5000;
server.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
