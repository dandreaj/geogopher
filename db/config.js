/*
 *  util/dbconfig.js
 */

const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv').config();
const users = require('./models/users');
const scores = require('./models/scores');

const DBPASSWD = process.env.DBPASSWD;

const sequelize = new Sequelize('geogopherdb', 'webAppLogin', DBPASSWD, {
  host: 'geogophers-postgresql-db.c8nqtytgojtc.us-east-1.rds.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  define: {
    charset: 'utf8',
    timestamps: false
  }
});

var db = {};

fs.readdirSync(__dirname + '/models')
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname + '/models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.users.hasMany(db.scores);
db.scores.belongsTo(db.users);  

module.exports = db;
