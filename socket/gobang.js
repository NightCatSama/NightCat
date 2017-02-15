
//  rooms 房间信息
let rooms = []

//  在线人数
let online_count = 0

//  房间数量上限
let limit = 10

/*  创建房间  */
const createRoom = (data, socket) => {
	rooms.push({
		create_at: Date.now(),
		room_name: data.room_name,
		owner: data.userInfo,
		challenger: null,
		password: data.password,
		status: '等待中'
	})
	
	socket.join(`room ${data.userInfo.account}`, () => {
		console.log(socket.rooms)
	})

	sendRooms(socket)
}

/*  发送房间信息  */
const sendRooms = (io, isBroadcast) => {
	let data = Array.from(rooms, (obj) => {
		let { room_name, players, status, owner, challenger } = obj
		return {
			room_name,
			isLock: !!obj.password,
			owner,
			challenger,
			players,
			status
		}
	})
	io.emit('Rooms', {
		data,
		online_count
	})
}

export default (socket, io) => {
	online_count++  //  在线人数 + 1
	console.log('有人进入了~' + online_count)

	sendRooms(io) //  连接成功发送房间信息

	socket.on('Update', () => sendRooms(io))  //  重新发送房间信息
	socket.on('Create', (data) => createRoom(data, socket)) //  创建房间
	socket.on('disconnect', () => {
		online_count--  //  在线人数 - 1
		console.log('有人退出了~' + online_count)
		sendRooms(io)
	})  //  离开房间
}