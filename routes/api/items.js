const router = require('express').Router()
const auth = require('../../middleware/auth')

/*
	Require Item Model
*/
const Item = require('../../models/Item')

/*
	@route GET /api/items
	@desc Get All Items
	@access public
*/
router.get('/', (req, res) => {
	Item.find()
		.sort({ date: -1 })
		.then(v => res.json(v))
})


/*
	@route POST /api/items
	@desc Create an item
	@access Private
*/
router.post('/', auth, (req, res) => {
	const newItem = new Item({
		name: req.body.name
	})

	newItem.save().then(value => res.json(value))
})


/*
	@route DELETE /api/items/:id
	@desc Delete an item
	@access Private
*/
router.delete('/:id', auth, (req, res) => {
	Item.findById(req.params.id)
		.then(item => item.remove())
		.then(() => res.json({ success: true }))
		.catch(() => res.status(404).json({ success: false }))
})

module.exports = router
