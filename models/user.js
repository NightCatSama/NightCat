import mongoose from 'mongoose'

let Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type: String,
        index: true
    },
	account: {
		type: String,
	},
	password: {
		type: String
	},
	email: {
		type: String,
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
	update_at: {
		type: String,
		default: Date.now
	},
	website: {
		type: String,
		default: ''
	},
	location: {
		type: String,
		default: ''
	},
	active: {
		type: Boolean,
		default: false
	},
  	accessToken: {
  		type: String
  	},
})

userSchema.index({account: 1}, {unique: true, sparse: true})
userSchema.index({email: 1}, {unique: true, sparse: true})
userSchema.index({accessToken: 1})

userSchema.pre('save', (next) => {
	var now = new Date();
	userSchema.update_at = now;
	next();
})

let user = mongoose.model('user', userSchema)

export default user