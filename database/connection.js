const DBConfig = require("./config");
const Sequelize = require("sequelize");

const storage = DBConfig.dialect === 'sqlite' ? DBConfig.database + '.db' : null;
const sequelize = new Sequelize(DBConfig.database, DBConfig.user, DBConfig.password, {
    host: DBConfig.server,
    dialect: DBConfig.dialect,
    storage: storage
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.models = require("./models")(sequelize, Sequelize);

module.exports = db;