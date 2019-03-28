var nytSportsModel = require('../models/nytSportsModel.js');

module.exports = function (app) {
    
    /*
     * GET
     */
    app.get('/', nytSportsModel.load);
};
