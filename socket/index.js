import SocketIO from 'socket.io'

export default (server) => {
  const io = SocketIO(server)

  io.on('connection', (socket) => {
    console.log('WebSocket is open!')
  })
}
