var express = require('express');
var router = express.Router();

var pugController = require('../controllers/pugController');

router.get('/', pugController.index);
router.get('/include_example', pugController.includeExample);
router.get('/template_example', pugController.templateExample);

module.exports = router;
