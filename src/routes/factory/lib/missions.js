export default {
	'mission1': function() {
		const missionCreater = () => {
			const createMandom = () => ~~(Math.random() * 10)
			let input = createMandom()
			return {
				input: input,
				output: input * 2
			}
		}
		return {
			err: [1, 2, 4, 5],
			entry: 0,
			output: 8,
			missionCreater
		}
	}
}