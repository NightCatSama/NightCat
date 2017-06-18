'use strict';

const _default = {
	width: 0, //canvas的宽度，默认窗口宽度
	height: 0, //canvas的高度，默认窗口高度
}

const firends = [{
	avatar: 'https://cdn.v2ex.com/gravatar/9606f9cc7e486b4cc5c118b9c0ad1d48/?d=https://cdn.v2ex.com/gravatar/9606f9cc7e486b4cc5c118b9c0ad1d48',
	name: 'NightCat'
}]

export default class Particle {
	constructor(elem, option) {
		Object.assign(this, _default, option)
		this.canvas = elem
		this.cxt = this.canvas.getContext('2d')
		this.isAnimate = true
		this.infos = []
		this.init()
	}
	init() {
		this.setSize()
		this.getFriends()
		this.start()
	}
	destory() {
		this.cxt.clearRect(0, 0, this.width, this.height)
		this.stop()
	}
	bindEvent() {
		this.canvas.addEventListener('mousemove', this.getMousePos.bind(this))
	}
	getFriends() {
		this.infos = Array.from(firends, (info) => {
			return {
				x: 100,
				vx: 5,
				vy: 3,
				y: 100,
				r: 10,
				color: '#000',
				...info
			}
		})
	}
	start() {
		this.isAnimate = true
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
	}
	getMousePos(e) {
	    this.mx = e.clientX - this.bounds.left;
		this.my = e.clientY - this.bounds.top;
	}
	setSize() {
		this.canvas.width = this.width = this.canvas.offsetWidth
		this.canvas.height = this.height = this.canvas.offsetHeight
	}
	render() {
		this.cxt.clearRect(0, 0, this.width, this.height)
		// 普通渲染
		Array.from(this.infos, (particle) => {
			this.cxt.fillStyle = 'rgba(' + particle.color + ')'

			this.cxt.beginPath()
			this.cxt.arc(particle.x, particle.y, particle.r, 0, 2 * Math.PI, true)
			this.cxt.closePath()

			this.cxt.fill()
		})
	}
	update() {
		Array.from(this.infos, (info) => {
			info.x += info.vx;
			info.y += info.vy;

			if (info.y >= this.height - info.r) {
				info.y = this.height - info.r;
				info.vy = -info.vy * Math.floor(Math.random() * 3 + 7) * 0.1;
			}
			if (info.y <= info.r) {
				info.y = info.r;
				info.vy = -info.vy * Math.floor(Math.random() * 3 + 7) * 0.1;
			}
			if (info.x >= this.width - info.r) {
				info.x = this.width - info.r;
				info.vx = -info.vx * Math.floor(Math.random() * 3 + 7) * 0.1;
			}
			if (info.x <= info.r) {
				info.x = info.r;
				info.vx = -info.vx * Math.floor(Math.random() * 3 + 7) * 0.1;
			}
		})
	}
}