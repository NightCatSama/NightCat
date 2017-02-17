import SocketIO from 'socket.io'
import gobang from './gobang'

export default (server) => {
	const io = SocketIO(server)

	io.on('connection', (socket) => {
		console.log('WebSocket is open!')
	})

	/*  五子棋  */
	let gobangIO = io.of('/gobang')
	gobangIO.on('connection', (socket) => gobang(socket, gobangIO))
}