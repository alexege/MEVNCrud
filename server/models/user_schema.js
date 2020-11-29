const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName field is required'],
    },
    lastName: {
      type: String,
      required: [true, 'LastName field is required'],
    },
    age: {
      type: Number,
      required: [true, 'age field is required'],
    },
  },
  { timestamps: true },
);

module.exports = model('users', userSchema);
