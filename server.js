const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/library");
const { ObjectId } = mongoose.Types;

const bookSchema = new mongoose.Schema({
    BookNumber: {
        type: Number,
        unique: true,
        required: true,
    },
    BookName: {
        type: String,
        required: true,
    },
    AuthorName: {
        type: String,
        required: true,
    },
    BookImgUrl: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("Book", bookSchema);
