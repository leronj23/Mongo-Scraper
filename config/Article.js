var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({

	headline: {
		type: String,
		unique: true
	},
	summary: {
		type: String,
		unique: true
	},
	url: {
		type: String,
		unique: true
	},
	photoURL: {
		type: String,
		unique: true
	},
	saved: {
		type: Boolean
	},

	// `note` is an object that stores a Note id
	// The ref property links the ObjectId to the Note model
	// This allows us to populate the Article with an associated Note
	noteId: [
		{
			type: Schema.Types.ObjectId,
			ref: "Note"
		}
	]
});

// This creates our model from the above schema, using mongoose's model method
module.exports = mongoose.model('Article', ArticleSchema);
