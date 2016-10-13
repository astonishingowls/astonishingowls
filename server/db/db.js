var Sequelize = require('sequelize');
var sequelize = new Sequelize('currencies', 'root', '', {
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port: 3306 // or 5432 (for postgres)
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;