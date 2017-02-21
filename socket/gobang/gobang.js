export default class Chess {
	constructor(options){
		Object.assign(this, options)
		this.player = 0
		this.ignores = []
		this.piece_count = 0
		this.pieces = []
		this.pieces0 = []
		this.pieces1 = []
	}
	/*  下了个棋子  */
	addPieces(index) {
		/*  是否已经存在  */
		if (this.pieces.indexOf(index) > -1)
			// this.unabled('该位置无法放置棋子')
			return false

		this.pieces.push(index)
		this[`pieces${this.player}`].push(index)
		if (this.isWin(index)) {
			return 'win'
		}
		if (this.pieces.length === 225) {
			return 'draw'
		}
		return true
	}
	/*  是否赢了  */
	isWin(index) {
		let lines = {
			's': [index],
			'h': [index],
			't': [index],
			'd': [index]
		}
		this.typeLine = this.createTypeLine(index)
		this.setLines(index, lines)
		for (let type in lines) {
			/*  其中一条线大于等于5个就赢了  */
			if (lines[type].length >= 5) {
				return true
			}
		}
		this.ignores = []
		return false
	}
	/*  得到该点四条线上的连点数  */
	setLines(index, lines, haveType) {
		let indexs = this.getIndexs(index, haveType)
		Array.from(indexs, (p) => {
			let type = this.getType(index, p)
			lines[type].push(p)
			this.setLines(p, lines, type)
		})
	}
	/*  type = undefined 得到8个方向上的我方棋子坐标, type = 线 得到该线两个方向上的我方棋子  */
	getIndexs(index, type) {
		this.ignores.push(index)
		let x = index % 15
		let y = ~~(index / 15)
		const xs = [x-1, x, x+1]
		const ys = [y-1, y, y+1]

		let n = []
		Array.from(xs, (i) => {
			Array.from(ys, (j) => {
				if (i < 0 || j < 0)
					return
				let p = j * 15 + i
				if (this.isEnable(p, type)) {
					n.push(p)
				}
			})
		})
		return n
	}
	/*  这个点是否可用(排除用过的, 不在方向上的, 不是自己的颜色的棋子)  */
	isEnable(index, type) {
		if (this.ignores.indexOf(index) > -1)
			return false

		if (type && this.typeLine[type].indexOf(index) === -1)
			return false

		this.ignores.push(index)
		if (this[`pieces${this.player}`].indexOf(index) > -1)
			return true

		return false
	}
	/*  根据一个点得到四条线的点(竖, 横, 上升, 下降)  */
	createTypeLine(index) {
		const maps = {
			s: 15,
			h: 1,
			d: 16,
			t: 14
		}
		let obj = {
			's': [index],
			'h': [index],
			't': [index],
			'd': [index]
		}
		let pos = this.getXY(index)
		let x = pos.x
		let y = pos.y
		for (let type in maps) {
			obj[type] = this.getOneTypeLine(type, x, y)
		}
		return obj
	}
	/*  得到单独一条线的点  */
	getOneTypeLine(type, x, y) {
		let arr = []
		let bx = x
		let by = y
		while(x >= 0 && y >= 0 && x <= 14 &&  y <= 14) {
			arr.push(this.getIndex(x, y))
			switch(type) {
				case 's': y += 1; break;
				case 'h': x += 1; break;
				case 'd': x += 1; y += 1; break;
				case 't': x += 1; y -= 1; break;
			}
		}
		x = bx
		y = by
		while(x >= 0 && y >= 0 && x <= 14 && y <= 14) {
			arr.push(this.getIndex(x, y))
			switch(type) {
				case 's': y -= 1; break;
				case 'h': x -= 1; break;
				case 'd': x -= 1; y -= 1; break;
				case 't': x -= 1; y += 1; break;
			}
		}
		return arr.slice(1)
	}
	/*  两点确定线的方向  */
	getType(index, p) {
		const maps = {
			15: 's',
			1: 'h',
			16: 'd',
			14: 't'
		}
		return maps[Math.abs(index - p)]  //  's'竖, 'h'横, 't'上升线, 'd'下降线
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
