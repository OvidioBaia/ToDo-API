const express = require('express');
const task_controller = require('./src/controller/taskController');

const router = express.Router();
router.get('/api/tasks', task_controller.show);
router.post('/api/tasks', task_controller.create);
// router.get('/user/:id', task_controller.details);
// router.patch('/user/:id', task_controller.update);
// router.delete('/user/:id', task_controller.delete);
module.exports = router;
