var cheerio = require("cheerio");
var axios = require("axios");

var db = require("../config");

module.exports = {

    /**
     * nytSportsModel.load()
     */
    load: function (req, res) {

        db.Article.find({})
            .then(function (dbArticle) {

                if (dbArticle.length == 0) {
                    res.render("noArticles");
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
                    photoURL: photoURL
                });
            });

            // Create a new Article using the `result` object built from scraping
            db.Article.create(results)
                .then(function (dbArticle) {

                    // View the added result in the console
                    console.log(dbArticle);

                    // Send a message to the client
                    res.render("index", dbArticle);
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
        db.Article.findOne({ _id: id }, function (err, dbArticle) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting nytSports.',
                    error: err
                });
            }
            if (!dbArticle) {
                return res.status(404).json({
                    message: 'No such nytSports'
                });
            }
            return res.json(nytSports);
        });
    },

    //     /**
    //      * nytSportsModel.create()
    //      */
    //     create: function (req, res) {
    //         var nytSports = new nytSportsModel({
    // 			headline : req.body.headline,
    // 			summary : req.body.summary,
    // 			url : req.body.url,
    // 			photoURL : req.body.photoURL

    //         });

    //         nytSports.save(function (err, nytSports) {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: 'Error when creating nytSports',
    //                     error: err
    //                 });
    //             }
    //             return res.status(201).json(nytSports);
    //         });
    //     },

    //     /**
    //      * nytSportsModel.update()
    //      */
    //     update: function (req, res) {
    //         var id = req.params.id;
    //         nytSportsModel.findOne({_id: id}, function (err, nytSports) {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: 'Error when getting nytSports',
    //                     error: err
    //                 });
    //             }
    //             if (!nytSports) {
    //                 return res.status(404).json({
    //                     message: 'No such nytSports'
    //                 });
    //             }

    //             nytSports.headline = req.body.headline ? req.body.headline : nytSports.headline;
    // 			nytSports.summary = req.body.summary ? req.body.summary : nytSports.summary;
    // 			nytSports.url = req.body.url ? req.body.url : nytSports.url;
    // 			nytSports.photoURL = req.body.photoURL ? req.body.photoURL : nytSports.photoURL;

    //             nytSports.save(function (err, nytSports) {
    //                 if (err) {
    //                     return res.status(500).json({
    //                         message: 'Error when updating nytSports.',
    //                         error: err
    //                     });
    //                 }

    //                 return res.json(nytSports);
    //             });
    //         });
    //     },

    //     /**
    //      * nytSportsModel.remove()
    //      */
    //     remove: function (req, res) {
    //         var id = req.params.id;
    //         nytSportsModel.findByIdAndRemove(id, function (err, nytSports) {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: 'Error when deleting the nytSports.',
    //                     error: err
    //                 });
    //             }
    //             return res.status(204).json();
    //         });
    //     }
};