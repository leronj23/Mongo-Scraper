var db = require("../config");

module.exports = {

    /**
     * nytSportsModel.home()
     */
    home: function (req, res) {
        db.Article.find(function (err, data) {
            if (err) {
                res.status(500).json({
                    message: 'Error when getting nytSports.',
                    error: err
                });
            }

            if (data.length < 0) {
                res.render("index", {});
            }
            else {
                res.render("index",);
            }
        });
    }

    //     /**
    //      * nytSportsModel.show()
    //      */
    //     show: function (req, res) {
    //         var id = req.params.id;
    //         nytSportsModel.findOne({_id: id}, function (err, nytSports) {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: 'Error when getting nytSports.',
    //                     error: err
    //                 });
    //             }
    //             if (!nytSports) {
    //                 return res.status(404).json({
    //                     message: 'No such nytSports'
    //                 });
    //             }
    //             return res.json(nytSports);
    //         });
    //     },

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