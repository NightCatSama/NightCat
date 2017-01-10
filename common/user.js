import md5 from 'md5'

/*  生成默认头像  */
const getGravatar = (email) => {
	return `https://cdn.v2ex.com/gravatar/${md5(email)}/?d=https://cdn.v2ex.com/gravatar/9606f9cc7e486b4cc5c118b9c0ad1d48`
}

export {
	getGravatar
}