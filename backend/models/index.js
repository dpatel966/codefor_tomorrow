const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const sequelize = new Sequelize('codefor_tomorrow', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  logging:false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && 
      file.slice(-3) === '.js' && 
      file !== path.basename(__filename) 
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.errorHendlar = (error) => {
  var errArr = error.errors;
  if (errArr != undefined && typeof errArr == 'object') {
    var arr = []
    for (let ear of errArr) {
      const { message } = ear;
      arr.push({ message })
    }
    return arr;
  }
}
// Test the database connection
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
