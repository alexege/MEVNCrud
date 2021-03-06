'use strict';

const User = require('../models/user_schema');
const Note = require('../models/note_schema');

const createData = (req, res) => {
  User.create(req.body)
    .then((data) => {
      console.log('New User Created!', data);
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
  })
}

const readData = (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const getUser = (req, res) => {
  User.findById(req.params.id)
  .then((data) => {
    return data;
  })
  .then((data) => {
    console.log("Found user: ", data);
    res.status(200).json(data);
  })
//   User.findById(id, function (err, docs) { 
//     if (err){ 
//         console.log(err); 
//     } 
//     else{ 
//         console.log("Result : ", docs); 
//     } 
// }); 
}

const updateData = (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      console.log('User updated!');
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

const deleteData = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new Error('User not available');
      }
      return data.remove();
    })
    .then((data) => {
      console.log('User removed!');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
  getUser,
  createData,
  readData,
  updateData,
  deleteData,
  getAllNotes
};
