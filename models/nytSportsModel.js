var cheerio = require("cheerio");
var axios = require("axios");

var ObjectId = require('mongoose').Types.ObjectId;
var db = require("../config");

module.exports = {

    /**
     * nytSportsModel.load()
     */
    load: function (req, res) {

        db.Article.find({ saved: false })
            .then(function (dbArticle) {

                if (dbArticle.length == 0) {
                    res.render("noArticles");
                }
                else {
                    console.log(dbArticle)
                    res.render("index", { dbArticle });
                }
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },

    /**
     * nytSportsModel.scrape()
     */
    scrape: function (req, res) {

        // Making a request via axios for reddit's "webdev" board. We are sure to use old.reddit due to changes in HTML structure for the new reddit. The page's Response is passed as our promise argument.
        axios.get("https://www.nytimes.com/section/sports").then(function (response) {

            // Load the Response into cheerio and save it to a variable
            // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
            var $ = cheerio.load(response.data);

            // An empty array to save the data that we'll scrape
            var results = [];

            // With cheerio, find each p-tag with the "title" class
            // (i: iterator. element: the current element)
            $("div.css-4jyr1y").each(function (i, element) {

                // Get Headline
                var headline = $(element).find(".css-1dq8tca").text();
                //console.log("headline", headline);

                // Get Summary
                var summary = $(element).find(".css-1echdzn").text();
                //console.log("summary", summary);

                // Get URL
                var url = "https://www.nytimes.com" + $(element).children().attr("href");
                //console.log("url", url)

                // Photo URL
                let photoURL = $(element).find(".css-11cwn6f").attr("src");
                //console.log("photoURL", photoURL);

                // Save these results in an object that we'll push into the results array we defined earlier
                results.push({
                    headline: headline,
                    summary: summary,
                    url: url,
                    photoURL: photoURL,
                    saved: false
                });
            });

            // Create a new Article using the `result` object built from scraping
            db.Article.create(results)
                .then(function (dbArticle) {

                    // View the added result in the console
                    //console.log("dbArticle");

                    // Send a message to the client
                    res.render("index");
                })
                .catch(function (err) {

                    // If an error occurred, log it
                    console.log(err);
                });
        });
    },

    /**
     * nytSportsModel.save()
     */
    save: function (req, res) {
        var id = req.params.id;

        db.Article.update({ _id: id }, { $set: { saved: true } }, function (err, dbArticle) {

            // Send a message to the client
            res.render("index", { dbArticle });
        })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },

    /**
     * nytSportsModel.saved()
     */
    saved: function (req, res) {

        db.Article.find({ saved: true })
            .then(function (dbArticle) {

                //console.log("dbArticle", dbArticle)

                if (dbArticle.length > 0) {
                    res.render("savedArticles", { dbArticle });
                }
                else {
                    res.render("noSavedArticles");
                }
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },

    /**
     * nytSportsModel.deleteAll()
     */
    deleteAll: function (req, res) {

        db.Article.remove({})
            .then(function (dbArticle) {

                //console.log("dbArticle", dbArticle)

                res.render("noArticles");
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },


    /**
     * nytSportsModel.delete()
     */
    delete: function (req, res) {
        var id = req.params.id;

        db.Article.remove({ _id: id })
            .then(function (dbArticle) {

                //console.log("dbArticle", dbArticle)

                if (dbArticle.length > 0) {

                    res.render("savedArticles", { dbArticle });
                }
                else {
                    res.render("index", { dbArticle });
                }
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },

    /**
     * nytSportsModel.populateNotes()
     */
    populateNotes: function (req, res) {
        var id = req.params.id;

        // Find all Articles
        db.Article.find({ _id: id })
            // Specify that we want to populate the retrieved Articles with any associated notes
            .populate("noteId")
            .then(function (dbArticles) {
                // If able to successfully find and associate all Articles and Notes, send them back to the client
                res.json(dbArticles);
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    },

    /**
     * nytSportsModel.addedNote()
     */
    addedNote: function (req, res) {
        var id = req.params.id;
        var addedNote = req.params.addedNote;

        // console.log("id", id)
        // console.log("addedNote", addedNote)

        db.Note.create({ body: addedNote })
            .then(function (dbNote) {

                console.log("dbNote", dbNote)

                // push each note id into an array on Article
                return db.Article.update({ _id: id }, { $push: { noteId: dbNote._id } }, { new: true })
            })
            .then(function (dbUser) {

                //console.log("dbUser", dbUser)

                // Send a message to the client
                res.render("savedArticles");

            }).catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    },

    /**
     * nytSportsModel.deleteNote()
     */
    deleteNote: function (req, res) {
        var id = req.params.id;
        var noteid = req.params.noteid;

        console.log("id", id)
        console.log("noteid", noteid)

        db.Note.remove({ _id: noteid })
            .then(function (dbNote) {

                // push each note id into an array on Article
                return db.Article.update({ _id: id }, { $pull: { "noteId": new ObjectId(noteid) }})
            }).then(function (dbUser) {

                res.render("savedArticles");
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    }
};
