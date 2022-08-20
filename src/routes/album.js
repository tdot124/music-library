const express = require('express');
const albumController = require('../controllers/album');

const router = express.Router();

router.post('/', albumController.create);
router.get('/', albumController.read);
router.get('/:albumId', albumController.readById);
router.patch('/:albumId', albumController.updateById)
router.delete('/:albumId', albumController.deleteById);

module.exports = router;