'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    //uri: 'mongodb://localhost/voting3-dev'
    uri: 'mongodb://admin:password@ds161162.mlab.com:61162/voting3'
  },

  // Seed database on startup
  seedDB: true

};
