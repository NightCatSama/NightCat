var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/:name', function(req, res, next) {
	console.log(`open the page => ${req.params.name}`)
	res.sendfile('views/dist/')
	// res.end()
})

module.exports = router