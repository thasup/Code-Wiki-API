// Require modules
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv").config();

// Start up an instance of app
const app = express();

// Setup EJS
app.set("view engine", "ejs");

// Add middleware
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

// Defines the port number
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Connect with MongoDB database
const password = process.env.MONGODB_PASS;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(`mongodb+srv://admin-first:${password}@cluster0.hi5zx.mongodb.net/wikiDB`);
};

// Create collection scheme and module
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model("Article", articleSchema);

// Request Targetting all Articles

app.route("/articles")
    // GET route
    .get((req, res) => {
        Article.find({}, (err, foundArticle) => {
            if (!err) {
                res.send(foundArticle);
            } else {
                res.send(err);
            }
        });
    })
    // POST route
    .post((req, res) => {
        console.log(req.body.title);
        console.log(req.body.content);

        const newArticle = new Article ({
            title: req.body.title,
            content: req.body.content,
        });

        newArticle.save((err) => {
            if (!err) {
                res.send("Successfully added a new article");
            } else {
                res.send(err);
            }
        });
    })
    // DELETE route
    .delete((req, res) => {
        Article.deleteMany({}, (err) => {
            if (!err) {
                res.send("Successfullt delete all articles!");
            } else {
                res.send(err);
            }
        });
    })
