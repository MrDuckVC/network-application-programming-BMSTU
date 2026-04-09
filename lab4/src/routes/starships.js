const express = require('express');
const router = express.Router();
const starshipController = require('../controllers/starshipController');

router.get('/', starshipController.getAllStarships);
router.get('/:id', starshipController.getStarshipById);
router.post('/', starshipController.createStarship);
router.patch('/:id', starshipController.updateStarship);
router.delete('/:id', starshipController.deleteStarship);

module.exports = router;
