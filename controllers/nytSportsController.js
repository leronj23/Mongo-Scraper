var nytSportsModel = require('../models/nytSportsModel.js');

module.exports = function (app) {

    /*
     * POST
     */
    app.post('/scrape', nytSportsModel.scrape);

    /*
     * PUT
     */
    app.put('/api/saved/:id', nytSportsModel.save);

    /*
     * PUT
     */
    app.delete('/api/delete/:id', nytSportsModel.delete);

    /*
     * DELETE
     */
    app.delete('/api/deleteAll/', nytSportsModel.deleteAll);

    /*
     * DELETE
     */
    //app.delete('/:id', nytSportsController.remove);
};
