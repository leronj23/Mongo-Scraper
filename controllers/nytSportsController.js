var nytSportsModel = require('../models/nytSportsModel.js');

module.exports = function (app) {

    /*
     * GET
     */
    app.get('/scrape', nytSportsModel.scrape);

    /*
     * PUT
     */
    app.put('/api/saved/:id', nytSportsModel.save);

    /*
     * DELETE
     */
    app.delete('/api/delete/:id', nytSportsModel.delete);

    /*
     * DELETE
     */
    app.delete('/api/deleteAll/', nytSportsModel.deleteAll);

    /*
     * POST
     */
    app.get('/api/populateduser/:id', nytSportsModel.populateNotes);

    /*
     * POST
     */
    app.post('/api/note/:id/:addedNote', nytSportsModel.addedNote);

    /*
     * DELETE
     */
    app.delete('/api/deleteNote/:id/:noteid', nytSportsModel.deleteNote);
};
