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
  createNote,
  deleteNote
} = require('../controllers/note_controller');

router
  //Users
  .post('/users', createData)
  .get('/users/', readData)
  .get('/users/:id', getUser)
  .put('/users/:id', updateData)
  .delete('/users/:id', deleteData)

  .get('/notes/all', getAllNotes)
  .post('/notes', createNote)
  .delete('/notes/:id', deleteNote)
 
module.exports = router;

// const {
//   createNote,
//   getAllNotes,
//   getNote,
//   updateNote,
//   deleteNote,
// } = require('../controllers/note_controller');

// const notesRouter = express.Router();

// notesRouter
//   .post('/notes', createNote)
//   .get('/notes/', getAllNotes)
//   .get('/notes/:id', getNote)
//   .put('/notes/:id', updateNote)
//   .delete('/notes/:id', deleteNote)

//   module.exports = notesRouter;
