const express = require("express");
const Book = require("./server");
const path = require("path");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

// Logging middleware (optional but useful for debugging)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});
app.post("/create", async (req, res) => {
    const { BookNumber, BookName, AuthorName, BookImgUrl } = req.body;
    const addbook = await Book.create({
        BookNumber,
        BookName,
        AuthorName,
        BookImgUrl,
    });
    res.redirect("/read");
});
app.get("/read", async (req, res) => {
    const bookdata = await Book.find();
    res.render("read", { bookdata });
});
app.post("/delete/:id", async (req, res) => {
    const { id } = req.params;
    await Book.findOneAndDelete({ _id: id });
    res.redirect("/read");
});

app.get("/update/:id", async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.render("update", { book });
});
app.post("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { BookNumber, BookName, AuthorName, BookImgUrl } = req.body;

    await Book.findByIdAndUpdate(id, {
        BookNumber,
        BookName,
        AuthorName,
        BookImgUrl,
    });
    res.redirect("/read");
});
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
