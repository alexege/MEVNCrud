'use strict';

// const Note = require('../models/note_schema');
const User = require('../models/user_schema');
const Note = require('../models/note_schema');

const createNote = (req, res) => {
  Note.create(req.body)
    .then((data) => {
      // console.log('New Note Created!', data);
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const getAllNotes = (req, res) => {
  Note.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const getNote = (req, res) => {
  Note.findById(req.params.id)
  .then((data) => {
    return data;
  })
  .then((data) => {
    console.log("Found Note: ", data);
    res.status(200).json(data);
  })

//   Note.findById(id, function (err, docs) { 
//     if (err){ 
//         console.log(err); 
//     } 
//     else{ 
//         console.log("Result : ", docs); 
//     } 
// }); 
}

const updateNote = (req, res) => {
  console.log("Updating note: ", req.params.id);
  Note.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('Note updated!');
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        console.error('Error Validating!', err);
        res.status(422).json(err);
      } else {
        console.error(err);
        res.status(500).json(err);
      }
    });
};

const deleteNote = (req, res) => {
  Note.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('Note not available');
      }
      return data.remove();
    })
    .then((data) => {
      console.log('Note removed!');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

// const test = (req, res) => {
//   alert("Testing!");
//   console.log("TESTING");
// }

module.exports = {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
  // test
};
