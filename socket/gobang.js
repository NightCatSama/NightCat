import Online from './on-line'

let rooms = {}
let myOnline = new Online() 

class Gobang {
	constructor(socket, io) {
		this.socket = socket
		this.io = io
		this.data = null
		this.room_id = ''
		
		this.onEvent()
	}
	/*  监听事件  */
	onEvent() {
		this.socket.on('Connect', this.connectSuccess.bind(this))  //  websocket连接
		this.socket.on('Update', this.sendRooms.bind(this))  //  重新发送房间信息
		this.socket.on('Create', this.createRoom.bind(this)) //  创建房间
		this.socket.on('Join', this.joinRoom.bind(this)) //  加入房间
		this.socket.on('Leave', this.leaveRoom.bind(this)) //  离开房间
		this.socket.on('disconnect', this.destory.bind(this))  //  断开连接
	}
	/*  连接成功  */
	connectSuccess(userInfo) {
		this.data = userInfo
		myOnline.connect(userInfo.account)
		console.log(`一个玩家进入了五子棋，当前人数：${myOnline.count}`)

		this.sendRooms() //  连接成功发送房间信息
	}
	/*  断开连接  */
	destory() {
		/*  开发环境下会导致this.data丢失报错  */
		if (!this.data) {
			return false
		}

		myOnline.disconnect(this.data.account)
		console.log(`一个玩家离开了五子棋，当前人数：${myOnline.count}`)

		this.room_id ? this.leaveRoom() : this.sendRooms()
	}
	/*  是否已经在房间中  */
	isIntoRoom() {
		for (let account in rooms) {
			if (this.data.account === account || (rooms[account].challenger && this.data.account === rooms[account].challenger.account)){
				return true
			}
		}
		return false
	}
	/*  发送所有房间信息  */
	sendRooms() {
		let data = []
		for (let account in rooms) {
			let { room_name, password, players, status, owner, challenger } = rooms[account]
			data.push({
				room_id: account,
				isLock: !!password,
				room_name,
				owner,
				challenger,
				players,
				status
			})
		}

		this.io.emit('Rooms', {
			online_count: myOnline.count,
			data
		})
	}
	/*  发送单个房间信息  */
	sendOneRoom() {
		this.io.to(this.room_id).emit('Room', {
			room_data: rooms[this.room_id]
		})
	}
	/**
	 * 返回消息给客户端
	 * @param  {string}  消息内容
	 * @param  {string}  消息类型
	 * @return {null}  
	 */
	sendMessage(msg, type) {
		this.socket.emit('Message', {
			type,
			msg
		})
	}
	/**
	 * 广播消息给房间
	 * @param  {string}  消息内容
	 * @param  {string}  消息类型
	 * @return {null}  
	 */
	broadcastMessage(msg, type) {
		this.io.to(this.room_id).emit('Message', {
			type,
			msg
		})
	}
	/**
	 * 创建房间
	 * @param  {object}  创建者信息
	 * @param  {string}  房间名
	 * @param  {string}  密码
	 * @return {null}
	 */
	createRoom({userInfo, room_name, password}) {
		if (this.isIntoRoom()) {
			return this.sendMessage('您已经在房间中', 'error')
		}

		rooms[userInfo.account] = {
			create_at: Date.now(),
			id: rooms.length,
			room_name,
			owner: userInfo,
			challenger: null,
			password,
			status: '等待中'
		}

		this.room_id = userInfo.account

		this.emitJoinRoom('owner')
		this.broadcastMessage(`【系统消息】${userInfo.name}创建了房间`, 'print')
	}
	/**
	 * 加入房间
	 * @param  {object}  加入者信息
	 * @param  {string}  房间号
	 * @param  {string}  密码
	 * @return {null} 
	 */
	joinRoom({userInfo, room_id, password}) {
		if (this.isIntoRoom()) {
			return this.sendMessage('您已经在房间中', 'error')
		}

		this.room_id = `${room_id}`
		if (rooms[this.room_id].password  && rooms[this.room_id].password !== password) {
			return this.sendMessage('密码错误', 'error')
		}

		rooms[this.room_id].challenger = userInfo

		this.emitJoinRoom('challenger')
		this.broadcastMessage(`【系统消息】${userInfo.name}加入了房间`, 'print')
	}
	/*  通知客户端进入房间  */
	emitJoinRoom(role) {
		this.socket.join(this.room_id, () => {
			this.socket.emit('inRoom', {
				room_id: this.room_id,
				room_data: rooms[this.room_id],
				role
			})
		})

		this.sendRooms()
	}
	/*  离开房间  */
	leaveRoom() {
		let data = rooms[this.room_id]
		
		/*  房间不存在  */
		if (!data) {
			return false
		}
		/*  房主退出  */
		else if (this.data.account === this.room_id) {
			this.broadcastMessage(`【系统消息】房主${data.owner.name}离开了房间，此房间将无法继续使用`, 'print')

			this.socket.leave(this.room_id, () => {
				rooms[this.room_id].owner = null
				this.sendOneRoom()
				delete rooms[this.room_id]
				this.room_id = ''

				this.sendRooms()
			})
		}
		/*  挑战者退出( 房间仍在 )  */
		else if (rooms[this.room_id]) {
			this.broadcastMessage(`【系统消息】${data.challenger.name}离开了房间`, 'print')

			this.socket.leave(this.room_id, () => {
				rooms[this.room_id].challenger = null
				this.sendOneRoom()
				this.room_id = ''

				this.sendRooms()
			})
		}
		else {
			this.room_id = ''
		}
	}
}

export default (socket, io) => {
	let gobang = new Gobang(socket, io)
}