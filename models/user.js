import mongoose from 'mongoose'

let Schema = mongoose.Schema

let userSchema = new Schema({
	name: {
		type: String,
		unique: true,
	},
	account: {
		type: String,
		unique: true,
	},
	password: {
		type: String
	},
	email: {
		type: String,
		unique: true,
	},
	profile: {
		type: String,
		default: '这个人很懒，啥也没留下。。。'
	},
	image: {
		type: String,
		default: ''
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: String,
		default: Date.now
	},
	website: {
		type: Date,
		default: null
	},
	location: {
		type: String,
		default: null
	},
	active: {
		type: Boolean,
		default: false
	},
})

let user = mongoose.model('user', userSchema)

export default user