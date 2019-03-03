var express = require('express');
var router = express.Router();

var todoController = require('../controllers/todoController');

router.get('/', todoController.index);
router.get('/today', todoController.today);
router.get('/completed', todoController.completed);

router.get('/create', todoController.createGet);
router.post('/create', todoController.createPost);

router.delete('/:id', todoController.delete);

module.exports = router;
