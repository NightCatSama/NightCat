
/*  关卡生成器  */
export default {
	'1': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = createMandom()
			return {
				input: input,
				output: input * 2
			}
		}
		return {
			err: [4, 5, 6],
			cols: 4,
			rows: 3,
			processor_count: 12,
			size: 64,
			entry: {
				'0': {
					pos: 'topProcessor'
				}
			},
			export: {
				'8': {
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	},
	'2': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = [createMandom(), createMandom(), createMandom()]
			let output = input.slice().sort((a, b) => a - b)
			return {
				input: input,
				output: output
			}
		}
		return {
			err: [],
			size: 64,
			entry: {
				'0': {
					pos: 'topProcessor'
				}
			},
			export: {
				'8': {
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	},
	'3': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 3) - 1
			let input = createMandom()
			let output = input > 0 ? { 'A': 1, 'B': 0, 'C': 0 } : input === 0 ? { 'A': 0, 'B': 1, 'C': 0 } : { 'A': 0, 'B': 0, 'C': 1 }
			return {
				input: input,
				output: output
			}
		}
		return {
			err: [],
			size: 32,
			cols: 3,
			rows: 3,
			processor_count: 9,
			isMultigroup: true,
			entry: {
				'1': {
					pos: 'topProcessor'
				}
			},
			export: {
				'6': {
					name: 'A',
					pos: 'bottomProcessor'
				},
				'7': {
					name: 'B',
					pos: 'bottomProcessor'
				},
				'8': {
					name: 'C',
					pos: 'bottomProcessor'
				}
			},
			missionCreater
		}
	}
}