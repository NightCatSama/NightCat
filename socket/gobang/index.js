import Online from '../on-line'
import Game from './gobang'

let rooms = {}
const total_time = 10 * 60
let myOnline = new Online()

/**
 * 包装返回的用户数据
 * @param  {Object} userInfo  用户数据
 * @return {Object}           包装后的用户数据
 */
const getInitialUserData = (userInfo, id) => {
	return {
		ready: false,
		time: total_time,
		status: '',
		win_number: 0,
		player: undefined,
		id,
		...userInfo
	}
}

/**
 * 包装返回的房间数据
 * @param  {Object} userInfo  用户数据
 * @param  {String} room_name 房间名
 * @param  {String} password  密码
 * @param  {String} id        Socket#id
 * @return {Object}           包装后的数据
 */
const getInitialGameData = (userInfo, room_name, password, id) => {
	return {
		create_at: Date.now(),
		room_name,
		password,
		owner: getInitialUserData(userInfo, id),
		challenger: null,
		initial_time: 0,
		game: new Game(),
		number: 0,
		player: 0,
		status: '等待中'
	}
}

/*  miao  */
class Gobang {
	constructor(socket, io) {
		this.socket = socket
		this.io = io
		this.data = null
		this.timer = null
		this.initial_time = 0
		this.role = ''
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
		this.socket.on('Message', this.broadcastMessage.bind(this)) //  切换准备状态
		this.socket.on('Ready', this.toggleReady.bind(this)) //  切换准备状态
		this.socket.on('Play', this.addChessPieces.bind(this)) //  下了个棋子
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
		/*  开发环境下会导致this.data丢失报错  */
		if (!this.data) {
			return false
		}

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
	sendMessage(msg, type, id) {
		if (id) {
			this.io.to(id).emit('Message', {
				type,
				msg
			})
		}
		else {
			this.socket.emit('Message', {
				type,
				msg
			})
		}
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

		rooms[userInfo.account] = getInitialGameData(userInfo, room_name, password, this.socket.id)

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
		data.challenger = getInitialUserData(userInfo, this.socket.id)

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
		else if (this.data && this.data.account === this.room_id) {
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
				data.owner = Object.assign(data.owner, {
					status: '',
					player: undefined,
					win_number: 0,
					time: total_time
				})
				data.number = 0
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
		/*  若为首次比赛，则随机一方黑棋  */
		let roles = ['owner', 'challenger']
		if (!data.number) {
			let isOwnerBlack = Math.random() >= 0.5
			Array.from(roles, (role, i) => {
				data[role].player = +(isOwnerBlack === !!i)
			})
			data.camp = isOwnerBlack ? roles : roles.reverse()
			this.broadcastMessage(`【系统消息】系统随机判定为${isOwnerBlack ? '上' : '下'}方玩家先手（黑棋）`, 'print')
		}
		else {
			Array.from(roles, (role, i) => {
				data[role].player = +!data[role].player
			})
			data.camp = data.camp.reverse()
		}
		data.player = 0
		data.status = '比赛中'
		this.broadcastMessage(`【系统消息】比赛开始！`, 'start')
		this.setPlayerStatus()
		this.sendRooms()
	}
	/*  比赛结束  */
	gameOver(player, isDraw) {
		let data = rooms[this.room_id]
		if (!data) {
			return false
		}

		data.number++
		data.status = '等待中'
		data.game = new Game()

		let winner = data[data.camp[player]]
		let loser = data[data.camp[+!player]]
		winner.status = '胜利'
		winner = Object.assign(winner, {
			ready: false,
			status: '',
			timer: total_time,
			win_number: winner.win_number + (isDraw ? 0 : 1)
		})
		loser = Object.assign(loser, {
			ready: false,
			status: '',
			timer: total_time
		})

		this.sendMessage('Victory', 'success', winner.id)
		this.sendMessage('Defeated', 'error', loser.id)
		this.sendOneRoom()
		this.sendRooms()
	}
	/**
	 * 下了个棋子
	 * @param {Number} player 玩家
	 * @param {Number} index  下的位置
	 */
	addChessPieces(player, index) {
		let data = rooms[this.room_id]
		if (!data) {
			return false
		}
		else if (data.player !== player) {
			return this.sendMessage(`请等待对手下棋`, 'error')
		}
		let game = data.game
		game.player = player

		let result = game.addPieces(index)
		if (!result) {
			return this.sendMessage(`无效的放置位置`, 'error')
		}

		this.io.to(this.room_id).emit('Play', player, index)
		data[data.camp[player]].time = data[data.camp[player]].time - ~~((Date.now() - data.initial_time) / 1000)
		clearTimeout(this.timer)
		this.timer = null

		if (result === 'win') {
			this.broadcastMessage(`【系统消息】${player === 0 ? '黑' : '白'}棋获得胜利`, 'end')
			this.gameOver(player)
		}
		else if (result === 'draw') {
			this.broadcastMessage('【系统消息】本场比赛结果为和棋', 'end')
			this.gameOver(player, true)
		}
		else {
			this.switchCamp()
		}
	}
	/*  切换阵营  */
	switchCamp() {
		let data = rooms[this.room_id]

		data.player = +!data.player
		this.setPlayerStatus()
		this.sendOneRoom()
	}
	/*  设置玩家状态  */
	setPlayerStatus() {
		let data = rooms[this.room_id]
		let roles = data.camp

		Array.from(roles, (role, i) => {
			if (i === data.player) {
				this.TimerBegin(data[role].time, data.player)
				data[role].status = data.player ? '白棋回合' : '黑棋回合'
			}
			else {
				data[role].status = ''
			}
		})
	}
	TimerBegin(time, player) {
		rooms[this.room_id].initial_time = Date.now()
		this.timer = setTimeout(() => {
			this.broadcastMessage(`【系统消息】由于${player === 0 ? '黑' : '白'}棋时间用尽，所以${player === 0 ? '白' : '黑'}棋获得胜利！`, 'end')
			this.gameOver(+!player)
		}, time * 1000)
	}
}

export default (socket, io) => {
	let gobang = new Gobang(socket, io)
}