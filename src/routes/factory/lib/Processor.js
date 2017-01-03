const _default = {
	width: 150,
	height: 150,
	_NEXT: null, // 上个过程将覆盖ACC的值
	_ACC: null, // 存储空间
	_context: {}, // 代码执行上下文
	cur_size: 0, // 当前大小
	size: 128, // 限制大小
	status: 'idle', // ['unavail', 'idle', 'error']
}

/*  Factory处理器对象  */
export default class Processor {
	constructor(options) {
		Object.assign(this, _default, options)
		this.asyncSize = this.asyncSize.bind(this)
		this.closeError = this.closeError.bind(this)
		this.init()
	}
	/*  绑定事件  */
	bindEvent() {
		this.code.addEventListener('keyup', this.asyncSize)
		this.elem.addEventListener('click', this.closeError)
	}
	/*  注销事件  */
	unbindEvent() {
		this.code.removeEventListener('keyup', this.asyncSize)
		this.elem.removeEventListener('click', this.closeError)
	}
	/*  初始化  */
	init() {
		this.createProcessor()
		this.bindEvent()
	}
	/*  销毁对象  */
	destory() {
		this.unbindEvent()
	}
	/*  创建一个处理器  */
	createProcessor() {
		this.elem = document.createElement('DIV')
		this.elem.className = 'factory-process'
		this.status === 'error' && this.setError()
		this.code = this.createCode()
		this.displayArea = this.createDisplayArea()
		this.wrap.appendChild(this.elem)
	}
	/*  错误模式  */
	setError() {
		this.elem.classList.add('factory-error')
		this.elem.setAttribute('data-error', 'ERROR')
	}
	/*  代码出错  */
	setCodeError(err) {
		this.elem.classList.add('factory-code-error')
		this.elem.setAttribute('data-error', err)
		this.factory.pause()
	}
	/*  代码出错遮罩层关闭  */
	closeError() {
		if (this.elem.classList.contains('factory-code-error')) {
			this.elem.classList.remove('factory-code-error')
		}
	}
	/*  创建代码窗口textarea  */
	createCode() {
		let elem = document.createElement('DIV')
		elem.className = 'code-group'
		elem.innerHTML = `<div class="code-index">Processor ${this.index + 1}</div>`

		let textarea = document.createElement('TEXTAREA')
		textarea.className = 'code'
		textarea.setAttribute('spellcheck', false)
		elem.appendChild(textarea)
		this.elem.appendChild(elem)
		return textarea
	}
	/*  创建展示台  */
	createDisplayArea() {
		let elem = document.createElement('DIV')
		elem.className = 'display-area'
		this.displayNext = this.createItem('NEXT', this._NEXT, elem)
		this.displayACC = this.createItem('ACC', this._ACC, elem)
		this.displayStatus = this.createItem('STATUS', this.status, elem)
		this.displaySize = this.createItem('BYTE', `${this.cur_size}/${this.size}`, elem)
		this.elem.appendChild(elem)
		return elem
	}
	/*  创建展示台的项目  */
	createItem(name, value, wrap) {
		let elem = document.createElement('DIV')
		elem.className = 'display-item'
		elem.innerHTML = `<div class="item-title">${name}</div>`

		let value_elem = document.createElement('DIV')
		value_elem.className = 'item-value'
		value_elem.textContent = value
		elem.appendChild(value_elem)
		wrap.appendChild(elem)
		return value_elem
	}
	/*  同步用户输入长度  */
	asyncSize(e) {
		let formatted_val = e.target.value.match(/\S/g)
		this.cur_size = formatted_val ? formatted_val.length : 0
		if (this.cur_size > this.size) {
			this.cur_size = this.size
			e.target.value = e.target.value.substr(0, this.size)
		}
		this.displaySize.innerHTML = `${this.cur_size}/${this.size}`
	}
	/*  处理器传递前判断  */
	transmitACC(val, key) {
		if (this[key].type === 'entry') {
			return false
		}
		else if (this[key].type === 'export') {
			val !== null && this.factory.detector.output(val, this[key].name)
		}
		else {
			this[key].setNext(val)
		}
	}
	/*  设置Status  */
	setStatus(val) {
		this.status = val
		this.displayStatus.innerHTML = this.status
	}
	/*  设置Next值  */
	setNext(val) {
		if (this.status === 'error')
			return

		this._NEXT = val
		this.displayNext.innerHTML = this._NEXT !== null ? JSON.stringify(this._NEXT) : ''
	}
	/*  运行  */
	next() {
		if (this.status === 'error')
			return false

		this.isEnd()
		this._ACC !== null && this.executeCode() // 执行用户的代码
	}
	/*  将NEXT传递给ACC  */
	resetACC() {
		this._ACC = this._NEXT
		this.displayACC.textContent = this._ACC !== null ? JSON.stringify(this._ACC) : ''
		this.setNext(null)
	}
	/*  判断是否全部执行完毕 (全部NEXT和ACC为零)  */
	isEnd() {
		if (this._ACC === null && this._NEXT === null) {
			this.setStatus('idle')
		}
		else {
			this.setStatus('run')
		}
	}
	/*  执行用户的代码  */
	executeCode() {
		let code = this.code.value
		const fn = function({ NEXT, ACC, TOLEFT, TORIGHT, TOTOP, TOBOTTOM, ERROR }) {
			try {
				eval(code)
			}
			catch (err) {
				ERROR(err)
			}
		}
		this._context = {}
		fn.call(this._context, {
			NEXT: this._NEXT,
			ACC: this._ACC,
			TOLEFT: (val) => this.leftProcessor && this.transmitACC(val, 'leftProcessor'),
			TORIGHT: (val) => this.rightProcessor && this.transmitACC(val, 'rightProcessor'),
			TOTOP: (val) => this.topProcessor && this.transmitACC(val, 'topProcessor'),
			TOBOTTOM: (val) => this.bottomProcessor && this.transmitACC(val, 'bottomProcessor'),
			ERROR: (err) => this.setCodeError(err)
		})
	}
	/*  设置进出口  */
	setPort(obj, type) {
		this[obj.pos] = {
			type: type,
			name: obj.name
		}
		this.elem.setAttribute('data-port', `${type === 'entry' ? 'INPUT' : 'OUTPUT'} ${obj.name || ''} ↓`)
		this.elem.classList.add(type)
	}
}