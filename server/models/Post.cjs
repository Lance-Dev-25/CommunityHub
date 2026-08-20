const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A title is required."],
      trim: true,
      maxlength: [100, "The title must be 100 characters or fewer."],
    },
    content: {
      type: String,
      required: [true, "Post content is required."],
      trim: true,
      maxlength: [2000, "Post content must be 2000 characters or fewer."],
    },
    author: {
      type: String,
      required: [true, "An author name is required."],
      trim: true,
      maxlength: [60, "The author name must be 60 characters or fewer."],
    },
    likes: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

postSchema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Post", postSchema);
