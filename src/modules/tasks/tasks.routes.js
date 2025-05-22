const express = require('express');
const router = express.Router();
const tasksController = require('./tasks.controller');  // Import the entire controller
router.get('/search', tasksController.findPlaces);
// router.get('/nearby', foodbaseController.findNearbyPlaces);

router.get('/', tasksController.getAllFoodbase);
router.get('/view/:id', tasksController.getFoodBaseById);
router.post('/update/:id', tasksController.updateTask);

module.exports = router;