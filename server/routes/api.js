const express = require('express');

const {
  getUser,
  createData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const router = express.Router();

router
  .post('/', createData)
  .get('/', readData)
  .get('/:id', getUser)
  .put('/:id', updateData)
  .delete('/:id', deleteData);

module.exports = router;
