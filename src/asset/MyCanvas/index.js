'use strict';

import Rhythm from './rhythm'

const _default = {
	text: 'NightCat', //文字
	music: './src/asset/MyCanvas/Sugar.mp3', //歌路径
	size: 180,
	color: '#fff',
	offset: 5,
	x: 0, //图像在canvas中的x坐标，默认居中
	y: 0, //图像在canvas中的y坐标，默认居中
	gridX: 3,  //间隔X
	gridY: 3,  //间隔Y
	r: 1  //粒子半径
}

class Particle {
	constructor(x, y, r, color, offset) {
		x = x + Math.random() * offset - offset * 0.5
		y = y + Math.random() * offset - offset * 0.5
		this.x = this.cx = x
		this.y = this.cy = y
		this.r = r
		this.color = color
		this.size = 200
	}
}

class Character {
	constructor(character) {
		this.character = character
		this.width = 0
		this.size = 200
		this.offset = 10
		this.particles = []
	}
}

export default class MyCanvas {
	constructor(id, option) {
		Object.assign(this, _default, option)

		this.rhythm = new Rhythm(this.music)
		this.canvas = document.getElementById(id)
		this.cxt = this.canvas.getContext('2d')
		this.placement = []
		this.isAnimate = false
		this.init()
	}
	init() {
		this.getSize()
		this.setText()
		this.start()
	}
	getSize() {
		this.width = this.canvas.width = this.canvas.offsetWidth
		this.height = this.canvas.height = this.canvas.offsetHeight
	}
	destory() {
		this.cxt.clearRect(0, 0, this.width, this.height)
		this.placement.length = 0
		this.stop()
	}
	bindEvent() {
		this.canvas.addEventListener('mousemove', this.getMousePos.bind(this))
	}
	getMousePos(e) {
	    this.mx = e.clientX - this.bounds.left;
		this.my = e.clientY - this.bounds.top;
	}
	setText() {
		Array.from(this.text, (character) => {
			let obj = new Character(character)
			let data = this.getPartical(character)
			obj.particles = data.particles
			obj.width = data.width
			this.placement.push(obj)
		})
	}
	getPartical(Character) {
		this.cxt.textAlign = 'center'
        this.cxt.font =  `normal ${this.size}px arial`
		this.cxt.fillStyle = this.color
		this.cxt.fillText(Character, this.width / 2, this.height / 2 + 50)
		let width = this.cxt.measureText(Character).width

		var idata = this.cxt.getImageData(0, 0, this.width, this.height)
		var buffer32 = new Uint32Array(idata.data.buffer)

		var particles = []

		for (var j = 0; j < this.height; j += this.gridY) {
			for (var i = 0; i < this.width; i += this.gridX) {
				if (buffer32[j * this.width + i]) {
					var particle = new Particle(i, j, this.r, this.color, this.offset)
					particles.push(particle)
				}
			}
		}

		this.cxt.clearRect(0, 0, this.width, this.height)

		return {
			width,
			particles
		}
	}
	start() {
		this.isAnimate = true
		// this.rhythm.play()
		const step = () => {
			if (!this.isAnimate) return false
			this.render()
			this.update()
			requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}
	stop() {
		this.isAnimate = false
		this.rhythm.pause()
	}
	render() {
		this.cxt.clearRect(0, 0, this.width, this.height)

		let length = 0
		Array.from(this.placement, (character) => {
			length += ~~(character.width)
		})
		let offset = length * -0.5
		Array.from(this.placement, (character) => {
			//  乱序数组
			// for(let j, x, i = character.particles.length; i; j = parseInt(Math.random() * i), x = character.particles[--i], character.particles[i] = character.particles[j], character.particles[j] = x);

			let width = ~~(character.width)
			let len = character.particles.length
			let oldX, oldY

			this.cxt.strokeStyle = this.color
			this.cxt.lineWidth = 0.5
			Array.from(character.particles, (particle, index) => {
				let x = particle.x + offset + 0.5 * width
				let y = particle.y
				// if (oldX) {
				// 	let d = Math.sqrt(Math.pow((x - oldX), 2) + Math.pow((y - oldY), 2))
				// 	if (d < 20) {
				// 		this.cxt.lineTo(x, y)
				// 		this.cxt.stroke()
				// 	}
				// }
				// else {
				// 	this.cxt.moveTo(x, y)
				// 	this.cxt.stroke()
				// }

				this.cxt.fillStyle = this.color
				this.cxt.beginPath()
				this.cxt.arc(particle.x + offset + 0.5 * width, particle.y, particle.r, 0, 2 * Math.PI, true)
				this.cxt.closePath()
				this.cxt.fill()

				oldX = x
				oldY = y
			})
			offset += width
		})
	}
	update() {
		let array = this.rhythm.getArr()
		let meterNum = 200
		let step = Math.round(array.length / meterNum) // 200取样
		let value = 0
		for (var i = 0; i < meterNum; i++) {
			value += array[i * step]
		}
		let average = value / meterNum
		// let range = Math.pow(this.mouseRange, 2)
		// let p = null,
		// 	dx, dy, d, t, f
		// Array.from(this.placement, (particle) => {
		// 	p = particle
		// 	dx = this.mx - p.x
		// 	dy = this.my - p.y
		// 	d = dx * dx + dy * dy
		// 	f = -range / d
		// 	if (Math.sqrt(d) < range) {
		// 		t = Math.atan2(dy, dx)
		// 		p.vx += f * Math.cos(t)
		// 		p.vy += f * Math.sin(t)
		// 	}
		// 	p.vx *= this.recovery
		// 	p.vy *= this.recovery
		// 	p.x += p.vx + (p.ox - p.x) * 0.25
		// 	p.y += p.vy + (p.oy - p.y) * 0.25
		// })

		Array.from(this.placement, (character) => {
			Array.from(character.particles, (particle) => {
				// particle.x = (average - 50) / 8 + particle.cx
				// particle.y = (average - 50) / 8 + particle.cy
				particle.r = average / 100 + 0.5
			})
		})
	}
};