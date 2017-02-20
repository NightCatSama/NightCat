const _default = {
	size: 600,                          // 棋盘大小
	shrink: 5,                         //  棋子大小 = 一格大小 - shrink
	color: ['#000', '#FFF'],            // 玩家1 玩家2 颜色
	cb: null,                           // 游戏结束回调方法
	bg_texture: require('images/wood.png')  //  背景纹理
}

export default class Chess {
	constructor(el, options){
		Object.assign(this, _default, options)
		this.checkerboard = el
		this.cxt = this.checkerboard.getContext('2d')
		this.gap = this.size / 15

		this.player = 0  // 0代表黑棋，1代表白旗
		this.ignores = []
		this.pieces = []
		this.pieces0 = []
		this.pieces1 = []
		this.clickHandle = this.clickHandle.bind(this)
		this.createCover()
		this.bindEvent()
		this.init()
	}
	/*  创造遮罩Canvas  */
	createCover() {
		this.cover = document.createElement('CANVAS')
		this.cover.className = 'canvas-mask'
		this.coverCtx = this.cover.getContext('2d')
		this.cover.width = this.size
		this.cover.height = this.size
		this.checkerboard.parentElement.appendChild(this.cover)
	}
	/*  绑定事件  */
	bindEvent() {
		this.cover.addEventListener('click', this.clickHandle)
	}
	/*  解除绑定  */
	unbindEvent() {
		this.cover.removeEventListener('click', this.clickHandle)
	}
	/*  初始化  */
	init() {
		this.coverCtx.clearRect(0, 0, this.size, this.size)
		this.setBg()
		this.initSize()
		this.status = 'unable'  //  不可点击
		this.cover.classList.add('unable')
	}
	gameStart() {
		this.cxt.clearRect(0, 0, this.size, this.size)
		this.coverCtx.clearRect(0, 0, this.size, this.size)
		this.setBg()
		this.pieces = []
		this.pieces0 = []
		this.pieces1 = []
		this.status = 0
		this.cover.classList.remove('unable')
	}
	gameOver() {
		this.status = 'unable'
		this.cover.classList.add('unable')
	}
	/*  初始化大小  */
	initSize() {
		this.checkerboard.width = this.size
		this.checkerboard.height = this.size
		this.bounds = this.checkerboard.getBoundingClientRect()
	}
	/*  设置背景图  */
	setBg() {
		this.image = new Image()
		this.image.onload = () => {
			this.cxt.fillStyle = this.cxt.createPattern(this.image, 'repeat')
        	this.cxt.fillRect(0, 0, this.size, this.size)
			this.createGridding()
		}
		this.image.src = this.bg_texture
	}
	/*  生成网格  */
	createGridding() {
		this.cxt.strokeStyle = '#000'
		this.cxt.shadowBlur = 0
		this.cxt.lineWidth = 1
		for (let x = 0; x < 15; x++) {
			this.cxt.beginPath()
			this.cxt.moveTo(x * this.gap + this.gap / 2, this.gap / 2)
			this.cxt.lineTo(x * this.gap + this.gap / 2, this.size - this.gap / 2)
			this.cxt.stroke()
			this.cxt.moveTo(this.gap / 2, x * this.gap + this.gap / 2)
			this.cxt.lineTo(this.size - this.gap / 2, x * this.gap + this.gap / 2)
			this.cxt.stroke()
			this.cxt.closePath()
		}
	}
	/*  点击事件  */
	clickHandle(e) {
		if (this.status !== this.player) {
			return false
		}
		let { x, y } = this.getMousePos(e)
		let index = this.getIndex(x, y)
		if (this.pieces.indexOf(index) > -1) {
			return false
		}
		this.addPiece(index)
	}
	/*  根据鼠标位置得到索引  */
	getMousePos(e) {
	    let mx = e.clientX - this.bounds.left,
	   		my = e.clientY - this.bounds.top
	    return {
	    	x: ~~(mx / this.gap),
	    	y: ~~(my / this.gap)
	    }
	}
	renderPiece(player, index) {
		let { x, y } = this.getXY(index)
		this.pieces.push(index)
		this[`pieces${player}`].push(index)
		this.createPiece(x, y, index, player)
	}
	/*  生成个棋子  */
	createPiece(x, y, index, player) {
		this.cxt.fillStyle = this.color[player]
		this.cxt.shadowColor = '#000'
		this.cxt.shadowBlur = 5

		this.cxt.beginPath()
		this.cxt.arc(x * this.gap + this.gap / 2, y * this.gap + this.gap / 2, (this.gap - this.shrink) / 2, 0, 2 * Math.PI, true)
		this.cxt.closePath()

		this.cxt.fill()
	}
	/*  根据索引获取坐标  */
	getXY(index) {
		return {
			x: index % 15,
			y: ~~(index / 15)
		}
	}
	/*  根据坐标获得索引  */
	getIndex(x, y) {
		return y * 15 + x
	}
}
