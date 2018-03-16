var Sequelize = require('sequelize');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://postgres@localhost:5432/beta_signup');

// setup User model and fields

const Signuper = sequelize.define('signuper', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});


//create all defined tables in the database
sequelize.sync()
  .then(() => console.log('users table created, if one doesnt exis\'t already'))
  .catch(error => console.log('This error occured', error));

  //export User model for use in other

  module.exports = Signuper;
