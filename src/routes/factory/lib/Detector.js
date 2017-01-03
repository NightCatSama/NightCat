const _default = {}

/*  Factory检测器对象  */
export default class Detector {
	constructor(options) {
		Object.assign(this, _default, options)
		this.init()
	}
	/*  初始化  */
	init() {
		this.items = []
		this.active = null
		this.last_output = 0
		this.success_count = 0
		this.output_active = null
		this.createDetector()
		this.initIems()
		this.render()
	}
	/*  重置  */
	reset() {
		this.last_output = 0
		this.setActive()
		this.setOutPutActive()
	}
	/*  创建右侧检测器  */
	createDetector() {
		this.elem = document.createElement('DIV')
		this.elem.className = 'factory-detector'
		if (this.isMultigroup) {
			this.output_group = {}
			this.input_group = this.createGroup('INPUT')
			for (let key in this.data[0].expectant_output) {
				this.output_group[key] = {}
				this.output_group[key].el = this.createGroup(`OUTPUT ${key}`)
				let el = document.createElement('DIV')
				el.className = 'factory-group-child-wrap'
				this.output_group[key].output_cgroup = this.createChildGroup(el)
				this.output_group[key].expect_cgroup = this.createChildGroup(el)
				this.output_group[key].el.appendChild(el)
			}
		}
		else {
			this.input_group = this.createGroup('INPUT')
			this.output_group = this.createGroup('OUTPUT')
			this.expect_group = this.createGroup('EXPECT')
		}
		this.wrap.appendChild(this.elem)
	}
	/*  生成各组  */
	createGroup(name) {
		let elem = document.createElement('DIV')
		elem.className = 'factory-group'
		elem.innerHTML = `<div class="group-title">${name}</div>`
		this.elem.appendChild(elem)
		return elem
	}
	createChildGroup(wrap) {
		let elem = document.createElement('DIV')
		elem.className = 'factory-group-child'
		wrap.appendChild(elem)
		return elem
	}
	/*  生成多项输出组  */
	createOutputGroup(name) {
		let elem = document.createElement('DIV')
		elem.className = 'factory-group'
		elem.innerHTML = `<div class="group-title">${name}</div>`
		this.
		this.elem.appendChild(elem)
		return elem
	}
	/*  生成各项  */
	createItem(value, index, wrap) {
		let elem = document.createElement('DIV')
		elem.className = 'factory-item'
		elem.innerHTML = value !== null ? this.fromat(value) : ''
		elem.setAttribute('data-index', index)
		wrap.appendChild(elem)
		return elem
	}
	/*  格式化展示  */
	fromat(v) {
		if (Object.prototype.toString.call(v) === '[object Object]') {
			let str = ''
			for (let key in v) {
				str += `<div>
					<span>${key}</span>
					<span>${v[key]}</span>
				</div>`
			}
			return str
		}
		else {
			return JSON.stringify(v)
		}
	}
	/*  初始化各项  */
	initIems() {
		this.items = Array.from(this.data, (obj, i) => {
			return Object.assign({
				index: i
			}, obj)
		})
	}
	/*  绘制  */
	render() {
		Array.from(this.items, (obj, i) => {
			if (this.isMultigroup) {
				/*  还没做好!  */
				obj.input_el = this.createItem(obj.input, i, this.input_group)
				// for (let key in this.data[0].expectant_output) {
				// 	console.log(key)
				// }
			}
			else {
				obj.input_el = this.createItem(obj.input, i, this.input_group)
				obj.output_el = this.createItem(obj.output, i, this.output_group)
				obj.expect_el = this.createItem(obj.expectant_output, i, this.expect_group)
			}
			// obj.input_el = this.createItem(obj.input, i, this.input_group)
			// obj.output_el = this.createItem(obj.output, i, this.output_group)
			// obj.expect_el = this.createItem(obj.expectant_output, i, this.expect_group)
		})
	}
	/*  设置当前input  */
	setActive(index) {
		this.active && this.active.classList.remove('active')
		if (typeof index === 'number') {
			this.active = this.input_group.querySelector(`[data-index="${index}"]`)
		}
		else {
			this.active = null
		}
		this.active && this.active.classList.add('active')
	}
	/*  设置当前output  */
	setOutPutActive(index) {
		this.output_active && this.output_active.classList.remove('active')
		if (typeof index === 'number') {
			this.output_active = this.output_group.querySelector(`[data-index="${index}"]`)
		}
		else {
			this.output_active = null
		}
		this.output_active && this.output_active.classList.add('active')
	}
	/*  输出值  */
	output(val, name) {
		if (this.last_output < this.data.length) {
			this.items[this.last_output].output = val
			this.items[this.last_output].output_el.textContent = val !== null ? this.fromat(val) : ''
			this.examine(this.last_output)
			this.setOutPutActive(this.last_output++)
			if (this.last_output === this.data.length) {
				this.setOutPutActive()
			}
		}
	}
	/*  检查是否正确  */
	examine(index) {
		let obj = this.items[index]
		if (this.isDiff(obj.output, obj.expectant_output)) {
			obj.output_el.classList.add('error')
		}
		else {
			this.success_count++
			obj.output_el.classList.add('success')
		}
	}
	/*  两个值是否不相等  */
	isDiff(a, b) {
		if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
			return true
		}
		else if (Array.isArray(a) && a.length === b.length) {
			return a.some((v, i) => v !== b[i])
		}
		return a !== b
	}
	cloneObj(obj) {
		let newObj = {}
		for (let key in obj) {
			newObj[key] = obj[key]
		}
		return newObj
	}
}