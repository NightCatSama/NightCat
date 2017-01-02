const _default = {
	width: 150,
	height: 150,
	_NEXT: 0, // 上个过程将覆盖ACC的值
	_ACC: 0, // 存储空间
	_context: {}, // 代码执行上下文
	cur_size: 0, // 当前大小
	size: 128, // 限制大小
	status: 'idle', // ['unavail', 'idle', 'run', 'error']
}

export default class Processor {
	constructor(options) {
		Object.assign(this, _default, options)
		this.init()
	}
	bindEvent() {
		this.code.addEventListener('keyup', this.asyncSize)
		this.elem.addEventListener('click', this.closeError)
	}
	unbindEvent() {
		this.code.removeEventListener('keyup', this.asyncSize)
		this.elem.removeEventListener('click', this.closeError)
	}
	init() {
		this.createProcessor()
		this.asyncSize = this.asyncSize.bind(this)
		this.closeError = this.closeError.bind(this)
		this.bindEvent()
	}
	destory() {
		this.unbindEvent()
	}
	createProcessor() {
		this.elem = document.createElement('DIV')
		this.elem.className = 'factory-process'
		this.status === 'error' && this.setError()
		this.code = this.createCode()
		this.displayArea = this.createDisplayArea()
		this.wrap.appendChild(this.elem)
	}
	setError() {
		this.elem.classList.add('factory-error')
		this.elem.setAttribute('data-error', 'ERROR')
	}
	setCodeError(err) {
		this.elem.classList.add('factory-code-error')
		this.elem.setAttribute('data-error', err)
	}
	closeError() {
		if (this.elem.classList.contains('factory-code-error')) {
			this.elem.classList.remove('factory-code-error')
		}
	}
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
	asyncSize(e) {
		this.cur_size = e.target.value.length
		if (this.cur_size > 0) {
			this.status = 'run'
			this.displayStatus.innerHTML = this.status
		} else {
			this.status = 'idle'
			this.displayStatus.innerHTML = this.status
		}
		if (this.cur_size > this.size) {
			this.cur_size = this.size
			e.target.value = e.target.value.substr(0, this.size)
		}
		this.displaySize.innerHTML = `${this.cur_size}/${this.size}`
	}
	setNext(val) {
		if (this.status === 'error')
			return

		this._NEXT = val
		this.displayNext.innerHTML = this._NEXT
	}
	next() {
		if (this.status === 'run') {
			this.executeCode() // 执行用户的代码
		}
	}
	resetACC() {
		this._ACC = this._NEXT
		this.displayACC.textContent = JSON.stringify(this._ACC)
		this.setNext(0)
	}
	executeCode() {
		let code = this.code.value
		const fn = function({ ACC, TOLEFT, TORIGHT, TOTOP, TOBOTTOM, ERROR }) {
			try {
				eval(code)
			}
			catch (err) {
				ERROR(err)
			}
		}
		fn.call(this._context, {
			ACC: this._ACC,
			TOLEFT: (val) => this.leftProcessor && this.leftProcessor.setNext(val),
			TORIGHT: (val) => this.rightProcessor && this.rightProcessor.setNext(val),
			TOTOP: (val) => this.topProcessor && this.topProcessor.setNext(val),
			TOBOTTOM: (val) => this.bottomProcessor && this.bottomProcessor.setNext(val),
			ERROR: (err) => this.setCodeError(err)
		})
	}
}