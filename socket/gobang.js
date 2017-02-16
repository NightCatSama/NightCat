//  socket.io 对象
let socket, io

//  rooms 房间信息
let rooms = []

//  在线人数
let online_count = 0

//  房间数量上限
let limit = 10

/*  创建房间  */
const createRoom = (data) => {
	rooms.push({
		create_at: Date.now(),
		id: rooms.length,
		room_name: data.room_name,
		owner: data.userInfo,
		challenger: null,
		password: data.password,
		status: '等待中'
	})
	
	socket.join(`${data.userInfo.account}`, () => {
		console.log(socket)
	})

	sendRooms(socket)
}

/*  加入房间  */
const joinRoom = (data) => {
	let room_id = `room ${data.userInfo.account}`
	socket.join(`room ${data.userInfo.account}`, () => {
		console.log(socket.rooms)
	})

	sendRooms()
}


/*  发送房间信息  */
const sendRooms = (isBroadcast) => {
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

export default (gobangIOSocket, gobangIO) => {
	socket = gobangIOSocket
	io = gobangIO
	online_count++  //  在线人数 + 1
	console.log(`一个玩家进入了五子棋，当前人数：${online_count}`)

	sendRooms() //  连接成功发送房间信息

	socket.on('Update', () => sendRooms())  //  重新发送房间信息
	socket.on('Create', (data) => createRoom(data)) //  创建房间
	socket.on('Join', (data) => joinRoom(data)) //  加入房间
	socket.on('disconnect', () => {
		online_count--  //  在线人数 - 1
		console.log(`一个玩家离开了五子棋，当前人数：${online_count}`)
		sendRooms()
	})  //  离开房间
}