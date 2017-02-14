import SocketIO from 'socket.io'
import gobang from './gobang'

export default (server) => {
	const io = SocketIO(server)

	io.on('connection', (socket) => {
		console.log('SocketIO is success!!! :>')

		socket.on('msg', function (data) {
			console.log(data)
		})
	})

	/*  五子棋  */
	io.of('/gobang').on('connection', gobang)
}