var Sequelize = require('sequelize');
var db = require('./db');

// we define the models we need using js--we don't need a schema file!
var User = db.define('User', {
    id: Sequelize.NUMBER,
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

var Search = db.define('Search', {
    text: Sequelize.STRING
});

// puts a UserId column on each Search instance
// also gives us the `.setUser` method available
// after creating a new instance of Search
Search.belongsTo(User);
// enables bi-directional associations between Users and Searches
User.hasMany(Search);


User.sync();
Search.sync();
// creates these tables in MySQL if they don't already exist. Pass in {force: true}
// to drop any existing user and message tables and make new ones.

exports.User = User;
exports.Search = Search;