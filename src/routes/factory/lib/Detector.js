const _default = {}

export default class Detector {
	constructor(options) {
		Object.assign(this, _default, options)
		this.init()
	}
	init() {
		this.items = []
		this.active = null
		this.createDetector()
		this.initIems()
		this.render()
	}
	createDetector() {
		this.elem = document.createElement('DIV')
		this.elem.className = 'factory-detector'
		this.input_elem = this.createGroup('INPUT')
		this.output_elem = this.createGroup('OUTPUT')
		this.expect_elem = this.createGroup('EXPECT')
		this.wrap.appendChild(this.elem)
	}
	createGroup(name) {
		let elem = document.createElement('DIV')
		elem.className = 'factory-group'
		elem.innerHTML = `<div class="group-title">${name}</div>`
		this.elem.appendChild(elem)
		return elem
	}
	createItem(value, index) {
		let elem = document.createElement('DIV')
		elem.textContent = value ? JSON.stringify(value) : ''
		elem.setAttribute('data-index', index)
		return elem
	}
	initIems() {
		this.items = Array.from(this.data, (obj, i) => {
			let item = document.createElement('DIV')
			return Object.assign({
				index: i,
				el: item
			}, obj)
		})
	}
	render() {
		Array.from(this.items, (obj, i) => {
			this.input_elem.appendChild(this.createItem(obj.input, i))
			this.output_elem.appendChild(this.createItem(obj.output, i))
			this.expect_elem.appendChild(this.createItem(obj.expectant_output, i))
		})
	}
	setActive(index) {
		this.active && this.active.classList.remove('active')
		this.active = this.input_elem.querySelector(`[data-index="${index}"]`)
		this.active && this.active.classList.add('active')
	}
}