/*
 * rooms 房间信息
 */
let rooms = [{
	owner: 'NightCat',
	password: '',
	players: [{
		name: 'NightCat',
		avatar: ''
	}],
	status: '', // 等待中， 比赛中
}]

export default (socket) => {
	socket.on('Create', (id) => {
		console.log(id)
	})

	socket.emit('rooms', rooms)
}