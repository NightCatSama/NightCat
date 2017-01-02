import Detector from './Detector'
import Processor from './Processor'
import missions from './missions'

const _default = {
	size: null,
	missions: missions,
	mission: 'mission1',
	data_count: 20,
	processor_count: 9
}

export default class Factory {
	constructor(el, options) {
		Object.assign(this, _default, options)
		this.elem = el
		this.init()
	}
	init() {
		Object.assign(this, this.missions[this.mission]())
		this.elem.innerHTML = ''
		this.data = []
		this.processors = []
		this.active = 0
		this.initSize()
		this.initMission()
		this.createContaner()
		this.loadProcessor()
		this.createDetector()
	}
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
	createDetector() {
		this.detector = new Detector({
			wrap: this.elem,
			data: this.data
		})
	}
	createContaner() {
		this.container = document.createElement('DIV')
		this.container.className = 'factory-container'
		this.elem.appendChild(this.container)
	}
	initMission() {
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
	loadProcessor() {
		for (let i = 0; i < this.processor_count; i++) {
			this.processors.push(new Processor({
				status: this.err.indexOf(i) > -1 ? 'error' : 'idle',
				wrap: this.container,
				index: i
			}))
		}
		Array.from(this.processors, (processor, i) => {
			let leftIndex = i - 1
			processor.leftProcessor = this.processors[leftIndex] || null
			let rightIndex = i + 1
			processor.rightProcessor = this.processors[rightIndex] || null
			let TopIndex = i - 3
			processor.topProcessor = this.processors[TopIndex] || null
			let BottomIndex = i + 3
			processor.bottomProcessor = this.processors[BottomIndex] || null
		})
	}
	start() {
		this.next()
	}
	next() {
		if (this.active < this.data.length) {
			this.detector.setActive(this.active)
			this.processors[this.entry].setNext(this.data[this.active].input)
			this.active++
		}

		Array.from(this.processors, (processor) => {
			processor.resetACC()
		})

		Array.from(this.processors, (processor) => {
			processor.next()
		})
	}
}