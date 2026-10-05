const express = require('express');
const router = express.Router();
const itemController = require('../Controllers/ItemController');


router.post('/add', itemController.addItem);
router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.put('/:id', itemController.updateItem);
router.delete('/:id', itemController.deleteItem);


module.exports = router;
