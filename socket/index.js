import SocketIO from 'socket.io'
import gobang from './gobang'

export default (server) => {
	const io = SocketIO(server)

	io.on('connection', (socket) => {
		console.log('SocketIO is success!!! :>')

		socket.on('msg', function (data) {
			console.log(data)
		})

		socket.on('Rooms', function (data) {
			console.log('========falsdjfkolasjdf======== :>')
		})
	})

	/*  五子棋  */
	let gobangIO = io.of('/gobang')
	gobangIO.on('connection', (socket) => gobang(socket, gobangIO))
}