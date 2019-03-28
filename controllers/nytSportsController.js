var nytSportsModel = require('../models/nytSportsModel.js');

module.exports = function (app) {

    /*
     * GET
     */
    app.get('/scrape', nytSportsModel.scrape);

    /*
     * PUT
     */
    //app.put('/:id', nytSportsController.update);

    /*
     * DELETE
     */
    //app.delete('/:id', nytSportsController.remove);
};
