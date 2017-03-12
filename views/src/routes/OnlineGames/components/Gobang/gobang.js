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
		this.chessboard = el
		this.container = this.chessboard.parentElement
		this.cxt = this.chessboard.getContext('2d')

		this.player = 0  // 0代表黑棋，1代表白旗
		this.ignores = []
		this.pieces = []
		this.pieces0 = []
		this.pieces1 = []
		this.curPiece = 128
		this.clickHandle = this.clickHandle.bind(this)
		this.resetChessboard = this.resetChessboard.bind(this)
		this.createBgCanvas()
		this.init()
		this.bindEvent()
	}
	/*  创造背景Canvas  */
	createBgCanvas() {
		this.bgCanvas = document.createElement('CANVAS')
		this.status = 'unable'  //  不可点击
		this.bgCanvas.className = 'canvas-mask unable'
		this.bgCxt = this.bgCanvas.getContext('2d')
		this.container.appendChild(this.bgCanvas)
	}
	/*  绑定事件  */
	bindEvent() {
		window.addEventListener('resize', this.resetChessboard)
		this.chessboard.addEventListener('click', this.clickHandle)
	}
	/*  解除绑定  */
	unbindEvent() {
		window.removeEventListener('resize', this.resetChessboard)
		this.chessboard.removeEventListener('click', this.clickHandle)
	}
	/*  初始化  */
	init() {
		this.initSize()
		this.setBg()
		this.gap = this.size / 15
	}
	/*  重新渲染棋盘  */
	resetChessboard() {
		this.init()
		this.render()
	}
	/*  比赛开始  */
	gameStart() {
		this.cxt.clearRect(0, 0, this.size, this.size)
		this.bgCxt.clearRect(0, 0, this.size, this.size)
		this.setBg()
		this.pieces = []
		this.pieces0 = []
		this.pieces1 = []
		this.status = 0
		this.bgCanvas.classList.remove('unable')
	}
	/*  比赛结束  */
	gameOver() {
		this.status = 'unable'
		this.bgCanvas.classList.add('unable')
	}
	/*  初始化大小  */
	initSize() {
		this.size = this.container.offsetHeight
		this.chessboard.width = this.size
		this.chessboard.height = this.size
		this.bgCanvas.width = this.size
		this.bgCanvas.height = this.size
		this.chessboard.style.cssText = `width: ${this.size}px; height: ${this.size}px;`
	}
	/*  设置背景图  */
	setBg() {
		this.image = new Image()
		this.image.onload = () => {
			this.bgCxt.fillStyle = this.bgCxt.createPattern(this.image, 'repeat')
        	this.bgCxt.fillRect(0, 0, this.size, this.size)
			this.createGridding()
		}
		this.image.src = this.bg_texture
	}
	/*  生成网格  */
	createGridding() {
		this.bgCxt.strokeStyle = '#000'
		this.bgCxt.shadowBlur = 0
		this.bgCxt.lineWidth = 1
		for (let x = 0; x < 15; x++) {
			this.bgCxt.beginPath()
			this.bgCxt.moveTo(x * this.gap + this.gap / 2, this.gap / 2)
			this.bgCxt.lineTo(x * this.gap + this.gap / 2, this.size - this.gap / 2)
			this.bgCxt.stroke()
			this.bgCxt.moveTo(this.gap / 2, x * this.gap + this.gap / 2)
			this.bgCxt.lineTo(this.size - this.gap / 2, x * this.gap + this.gap / 2)
			this.bgCxt.stroke()
			this.bgCxt.closePath()
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
		this.bounds = this.chessboard.getBoundingClientRect()
	    let mx = e.clientX - this.bounds.left,
	   		my = e.clientY - this.bounds.top
	    return {
	    	x: ~~(mx / this.gap),
	    	y: ~~(my / this.gap)
	    }
	}
	/*  加个棋子  */
	renderPiece(player, index) {
		this.pieces.push(index)
		this[`pieces${player}`].push(index)
		this.curPiece = index
		this.render()
	}
	/*  开始渲染  */
	render() {
		this.cxt.clearRect(0, 0, this.size, this.size)
		Array.from(this.pieces0, (index) => {
			this.createPiece(index, 0)
		})
		Array.from(this.pieces1, (index) => {
			this.createPiece(index, 1)
		})
	}
	/*  生成个棋子  */
	createPiece(index, player) {
		let { x, y } = this.getXY(index)
		this.cxt.fillStyle = this.color[player]
		this.cxt.shadowColor = '#000'
		this.cxt.shadowBlur = 5

		let centerX = x * this.gap + this.gap / 2
		let centerY = y * this.gap + this.gap / 2

		this.cxt.beginPath()
		this.cxt.arc(centerX, centerY, (this.gap - this.shrink) / 2, 0, 2 * Math.PI, true)
		this.cxt.closePath()

		this.cxt.fill()
		
		if (index === this.curPiece) {
			this.cxt.shadowColor = 'transparent'
			this.cxt.shadowBlur = 0
			this.cxt.beginPath()
			this.cxt.moveTo(centerX - this.gap / 8, centerY)
			this.cxt.lineTo(centerX + this.gap / 8, centerY)
			this.cxt.moveTo(centerX, centerY - this.gap / 8)
			this.cxt.lineTo(centerX, centerY + this.gap / 8)
			this.cxt.strokeStyle = '#d71345'
			this.cxt.stroke()
		}
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
