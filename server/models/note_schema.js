const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  { timestamps: true },
);

module.exports = model('Note', noteSchema);
