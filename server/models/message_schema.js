const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field is required'],
    },
    message: {
      type: String,
      required: [true, 'message field is required'],
    },
    creator: {
      type: User,
      required: [true, 'Creator field is required'],
    },
  },
  { timestamps: true },
);

module.exports = model('users', userSchema);