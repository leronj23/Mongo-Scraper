var nytSportsModel = require('../models/nytSportsModel.js');

module.exports = function (app) {

    /*
     * GET
     */
    app.get('/scrape', nytSportsModel.scrape);

    /*
     * PUT
     */
    app.put('/:id', nytSportsController.save);

    /*
     * DELETE
     */
    //app.delete('/:id', nytSportsController.remove);
};
