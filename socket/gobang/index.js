import Online from '../on-line'
import Chess from './chess'

let rooms = {}
let myOnline = new Online()

/**
 * 包装返回的用户数据
 * @param  {Object} userInfo  用户数据
 * @param  {Number} game_time 剩余时长[单位：秒]
 * @return {Object}           包装后的用户数据
 */
const getInitialUserData = (userInfo, game_time = 10 * 60) => {
	return { 
		ready: false,
		time: game_time,
		win_number: 0,
		...userInfo
	}
}

/**
 * 包装返回的房间数据
 * @param  {Object} userInfo  用户数据
 * @param  {String} room_name 房间名
 * @param  {String} password  密码
 * @return {Object}           包装后的数据
 */
const getInitialGameData = (userInfo, room_name, password) => {
	return {
		create_at: Date.now(),
		room_name,
		password,
		owner: getInitialUserData(userInfo),
		challenger: null,
		game_data: new Chess(),
		number: 0,
		status: '等待中'
	}
}

/*  miao  */
class Gobang {
	constructor(socket, io) {
		this.socket = socket
		this.io = io
		this.data = null
		this.role = ''
		this.room_id = ''
		/*  总时长  */
		this.all_time = 10 * 60 * 1000
		
		this.onEvent()
	}
	/*  监听事件  */
	onEvent() {
		this.socket.on('Connect', this.connectSuccess.bind(this))  //  websocket连接
		this.socket.on('Update', this.sendRooms.bind(this))  //  重新发送房间信息
		this.socket.on('Create', this.createRoom.bind(this)) //  创建房间
		this.socket.on('Join', this.joinRoom.bind(this)) //  加入房间
		this.socket.on('Leave', this.leaveRoom.bind(this)) //  离开房间
		this.socket.on('Message', this.broadcastMessage.bind(this)) //  切换准备状态
		this.socket.on('Ready', this.toggleReady.bind(this)) //  切换准备状态
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
	 * @param  {String} msg  消息内容
	 * @param  {String} type 消息类型
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
	 * @param  {String} msg  消息内容
	 * @param  {String} type 消息类型
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
	 * @param  {Object} userInfo  创建者信息
	 * @param  {String} room_name 房间名
	 * @param  {String} password  密码
	 * @return {null}
	 */
	createRoom({userInfo, room_name, password}) {
		if (this.isIntoRoom()) {
			return this.sendMessage('您已经在房间中', 'error')
		}

		rooms[userInfo.account] = getInitialGameData(userInfo, room_name, password)
		
		//  角色设定为房主
		this.role = 'owner'
		this.room_id = userInfo.account

		this.emitJoinRoom(this.role)
		this.broadcastMessage(`【系统消息】${userInfo.name}创建了房间`, 'print')
	}
	/**
	 * 加入房间
	 * @param  {Object} userInfo  加入者信息
	 * @param  {String} room_name 房间名
	 * @param  {String} password  密码
	 * @return {null} 
	 */
	joinRoom({userInfo, room_id, password}) {
		if (this.isIntoRoom()) {
			return this.sendMessage('您已经在房间中', 'error')
		}

		this.room_id = `${room_id}`
		let data = rooms[this.room_id]
		if (data.password && data.password !== password) {
			return this.sendMessage('密码错误', 'error')
		}
		
		//  角色设定为房主
		this.role = 'challenger'
		data.challenger = getInitialUserData(userInfo)

		this.emitJoinRoom(this.role)
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
			this.sendOneRoom()
		})

		this.sendRooms()
	}
	/*  离开房间  */
	leaveRoom() {
		let data = rooms[this.room_id]
		/*  房间不存在的  */
		if (!data) {
			return false
		}
		/*  房主退出  */
		else if (this.data.account === this.room_id) {
			this.broadcastMessage(`【系统消息】房主${data.owner.name}离开了房间，此房间将无法继续使用`, 'print')

			this.socket.leave(this.room_id, () => {
				data.owner = null
				this.sendOneRoom()
				delete rooms[this.room_id]
				this.room_id = ''

				this.sendRooms()
			})
		}
		/*  挑战者退出( 房间仍在 )  */
		else if (data) {
			this.broadcastMessage(`【系统消息】${data.challenger.name}离开了房间`, 'print')

			this.socket.leave(this.room_id, () => {
				data.challenger = null
				this.sendOneRoom()
				this.room_id = ''

				this.sendRooms()
			})
		}
		else {
			this.room_id = ''
		}
	}
	/*  切换准备状态  */
	toggleReady() {
		let data = rooms[this.room_id]
		/*  房间不存在  */
		if (!data || data.status === '比赛中') {
			return false
		}
		data[this.role].ready = !data[this.role].ready
		if (data.owner.ready && data.challenger && data.challenger.ready) {
			this.gameStart()
		}
		this.sendOneRoom()
	}
	/*  比赛开始啦  */
	gameStart() {
		let data = rooms[this.room_id]
		/*  若为首次比赛，则随机一方黑旗  */
		let roles = ['owner', 'challenger']
		if (!data.number) {
			let isOwnerBlack = Math.random() >= 0.5
			Array.from(roles, (role, i) => {
				/*  房主代表true，挑战者代表false  */
				data[role].isBlack = isOwnerBlack === !i
			})
			this.broadcastMessage(`【系统消息】系统随机判定为${isOwnerBlack ? '上' : '下'}方玩家先手（黑旗）`, 'print')
		}
		else {
			Array.from(roles, (role, i) => {
				data[role].isBlack = !data[role].isBlack
			})
		}
		data.status = '比赛中'
		this.broadcastMessage(`【系统消息】比赛开始！`, 'print')
		this.sendRooms()
	}
}

export default (socket, io) => {
	let gobang = new Gobang(socket, io)
}