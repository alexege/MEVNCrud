const express = require('express');
const router = express.Router();

const {
  getUser,
  createData,
  readData,
  updateData,
  deleteData,
} = require('../controllers/user_controller');

const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/note_controller');

router
  // Users
  .post('/users', createData)
  .get('/users/', readData)
  .get('/users/:id', getUser)
  .put('/users/:id', updateData)
  .delete('/users/:id', deleteData)

  // Notes
  .post('/notes', createNote)
  .get('/notes/all', getAllNotes)
  .get('/notes/:id', getNote)
  .put('/notes/:id', updateNote)
  .delete('/notes/:id', deleteNote)
 
module.exports = router;