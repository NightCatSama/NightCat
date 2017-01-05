import Detector from './Detector'
import Processor from './Processor'
import missions from './missions'

import './style/'

const _default = {
	size: null,
	inService: false,
	missions: missions,
	mission: 1,
	test_count: 2,
	data_count: 20,
	cols: 3,
	rows: 3,
	processor_count: 9,
	speed: 5
}

/*  Factory游戏对象  */
export default class Factory {
	constructor(el, options) {
		Object.assign(this, _default, options)
		this.elem = el
		this.data = []
		this.events = []
		this.detector = null
		this.active = 0
		this.test_active = 0
		this.init()
	}
	/*  初始化  */
	init() {
		this.initSize()
		this.getMissions()
		this.initMission()
		this.createContaner()
		this.createConsole()
		this.initProcessor()
		this.createDetector()
		this.createPanel()
	}
	/*  销毁对象  */
	destory() {
		this.elem.innerHTML = ''
		this.data = []
		this.events = []
		this.active = 0
		this.test_active = 0
		this.inService = false
		this.detector = null
		while(this.events.length) {
			(this.events.shift())()
		}
	}
	/*  初始化容器大小  */
	initSize() {
		if (this.size) {
			this.width = this.size[0]
			this.height = this.size[1]
			this.elem.style.cssText = `
				width: ${this.width}px;
				height: ${this.height}px;
			`
		} else {
			this.width = this.elem.offsetWidth
			this.height = this.elem.offsetHeight
		}
	}
	/*  生成检测器对象  */
	createDetector() {
		this.detector = new Detector({
			wrap: this.console,
			isMultigroup: this.isMultigroup || false,
			factory: this,
			data: this.data
		})
	}
	/*  生成游戏控制面板  */
	createPanel() {
		this.panel = document.createElement('DIV')
		this.panel.className = 'factory-panel'

		/*  控制台按钮面板  */
		this.btnGroup = document.createElement('DIV')
		this.btnGroup.className = 'factory-btn-group'
		this.nextBtn = this.createBtn('Next', this.next, this.btnGroup)
		this.autoBtn = this.createBtn('Auto', this.auto, this.btnGroup)
		this.resetBtn = this.createBtn('Reset', this.reset, this.btnGroup)
		this.restartBtn = this.createBtn('Restart', this.restart, this.btnGroup)

		/*  消息面板  */
		this.msgGroup = document.createElement('DIV')
		this.msgGroup.className = 'factory-msg-group'
		this.msgGroup.textContent = 'Code Mode'

		/*  执行速度面板  */
		this.speedGroup = document.createElement('DIV')
		this.speedGroup.className = 'factory-speed-group'
		this.slowBtn = this.createBtn('Slow', this.slow, this.speedGroup)
		this.speedDisplay = document.createElement('DIV')
		this.speedDisplay.className = 'factory-speed'
		this.setSpeed(this.speed)
		this.speedGroup.appendChild(this.speedDisplay)
		this.fastBtn = this.createBtn('Fast', this.fast, this.speedGroup)
	
		this.panel.appendChild(this.speedGroup)
		this.panel.appendChild(this.btnGroup)
		this.panel.appendChild(this.msgGroup)
		this.console.appendChild(this.panel)
	}
	/*  设置速度  */
	setSpeed(speed) {
		this.speed = speed
		this.interval = 330 - this.speed * 30
		this.speedDisplay.textContent = `Speed: ${this.speed}`
		this.resetTimer()
	}
	/*  加快速度  */
	fast() {
		if (this.fastBtn.classList.contains('disabled')) 
			return false
		this.speed === 1 && this.slowBtn.classList.remove('disabled')
		this.setSpeed(this.speed + 1)
		this.speed === 10 && this.fastBtn.classList.add('disabled')
	}
	/*  加快速度  */
	slow() {
		if (this.slowBtn.classList.contains('disabled')) 
			return false
		this.speed === 10 && this.fastBtn.classList.remove('disabled')
		this.setSpeed(this.speed - 1)
		this.speed === 1 && this.slowBtn.classList.add('disabled')
	}
	/*  生成控制按钮  */
	createBtn(name, fn, wrap) {
		let btn = document.createElement('BUTTON')
		btn.className = 'factory-panel-btn'
		btn.textContent = name
		fn = fn.bind(this)
		btn.addEventListener('click', fn, false)
		this.events.push(() => btn.removeEventListener('click', fn, false))
		wrap.appendChild(btn)
		return btn
	}
	/*  生成游戏主体容器  */
	createContaner() {
		this.container = document.createElement('DIV')
		this.container.className = 'factory-container'
		this.elem.appendChild(this.container)
	}
	/*  生成右侧控制台  */
	createConsole() {
		this.console = document.createElement('DIV')
		this.console.className = 'factory-console'
		this.elem.appendChild(this.console)
	}
	/*  得到关卡数据  */
	getMissions() {
		let fn = this.missions[this.mission]
		if (typeof fn !== 'function') {
			alert('你已全部通关（撒花') 
		}
		else {
			Object.assign(this, this.missions[this.mission]())
			this.processor_count = this.cols * this.rows
		}
	}
	/*  设置关卡  */
	initMission() {
		this.intro && this.elem.setAttribute('data-intro', this.intro)
		this.elem.offsetWidth
		for (let i = 0; i < this.data_count; i++) {
			let d = this.missionCreater()
			this.data.push({
				input: d.input,
				output: null,
				expectant_output: d.output,
				result: 'pending'
			})
		}
	}
	/*  初始化处理器  */
	initProcessor() {
		this.processors = []
		for (let i = 0; i < this.processor_count; i++) {
			this.processors.push(new Processor({
				width: `${100 / this.cols - 3}%`,
				height: `${100 / this.rows - 3}%`,
				status: this.err && this.err.indexOf(i) > -1 ? 'error' : 'idle',
				size: this.size,
				wrap: this.container,
				factory: this,
				index: i
			}))
		}
		Array.from(this.processors, (processor, i) => {
			let leftIndex = i - 1
			processor.leftProcessor =  i % this.cols ? (this.processors[leftIndex] || null) : null
			let rightIndex = i + 1
			processor.rightProcessor = rightIndex % this.cols ? (this.processors[rightIndex] || null) : null
			let TopIndex = i - this.cols
			processor.topProcessor = this.processors[TopIndex] || null
			let BottomIndex = i + this.cols
			processor.bottomProcessor = this.processors[BottomIndex] || null

			if (this.entry[i]) {
				processor.setPort(this.entry[i], 'entry')
			}
			if (this.export[i]) {
				processor.setPort(this.export[i], 'export')
			}
		})
	}
	/*  运行中禁止代码输入  */
	unableCodeInput(bool) {
		/*  分别执行  */
		Array.from(this.processors, (processor) => {
			bool ? processor.code.setAttribute('disabled', true) : processor.code.removeAttribute('disabled')
		})
	}
	/*  游戏开始  */
	auto() {
		if (this.timer)
			return this.pause()

		this.autoBtn.textContent = 'pause'
		this.autoBtn.classList.add('active')
		this.timer = setInterval(() => {
			this.next()
		}, this.interval)
	}
	resetTimer() {
		if (!this.timer) {
			return false
		}
		this.next()
		clearInterval(this.timer)
		this.timer = null
		this.timer = setInterval(() => {
			this.next()
		}, this.interval)
	}
	/*  游戏暂停  */
	pause() {
		this.autoBtn.textContent = 'Auto'
		this.autoBtn.classList.remove('active')
		clearInterval(this.timer)
		this.timer = null
	}
	/*  关卡结束  */
	end() {
		if (this.detector.success_count === this.data.length) {
			if (this.test_active === this.test_count) {
				this.pause()
				this.msgGroup.textContent = '你通关了, 点GO进入下一关:)'
				if (!this.nextMissionBtn) {
					this.nextMissionBtn = this.createBtn('Go', this.nextMission, this.btnGroup)
				}
			}
			else {
				this.console.removeChild(this.detector.elem)
				this.detector = null
				this.createDetector()
				this.test_active++
				this.active = 0
				this.detector.success_count = 0
				this.msgGroup.textContent = `Running Mode：已通过测试（${this.test_active}/${this.test_count + 1}）`
				Array.from(this.processors, (processor) => processor.setCom(null))
			}
		}
		else {
			this.pause()
			this.msgGroup.textContent = `出错了${this.data.length - this.detector.success_count}个, 点击Reset再改改`
		}
	}
	/*  下一关  */
	nextMission() {
		this.mission = this.mission + 1
		this.restart()
		this.nextMissionBtn = null
	}
	/*  关卡重置  */
	restart() {
		this.msgGroup.textContent = 'Code Mode'
		this.pause()
		this.destory()
		this.init()
	}
	/*  运行重置  */
	reset() {
		this.active = 0
		this.test_active = 0
		this.inService = false
		this.unableCodeInput(false)
		this.detector.reset()
		this.msgGroup.textContent = 'Code Mode'
		Array.from(this.processors, (processor) => {
			processor._NEXT = null
			processor.setCom(null)
			processor.resetACC()
		})
	}
	/*  执行下一步  */
	next() {
		if (this.active < this.data.length) {
			this.detector.setInputActive(this.active)
			this.entryGetNext()
			if (!this.inService) {
				this.inService = true
				this.msgGroup.textContent = 'Running Mode'
				this.unableCodeInput(true)
			}
			this.active++
		}
		else {
			this.detector.setInputActive()
		}

		/*  全部重置值  */
		Array.from(this.processors, (processor) => {
			processor.resetACC()
		})

		this.entryGetNext()

		/*  分别执行  */
		Array.from(this.processors, (processor) => {
			processor.next()
		})

		/*  判断是否全部停滞  */
		!this.processors.some((processor) => processor.status === 'run') && this.end()
	}
	/*  入口得到Next值  */
	entryGetNext() {
		for (let key in this.entry) {
			this.data[this.active] && this.processors[key].setNext(this.data[this.active].input)
		}
	}
}