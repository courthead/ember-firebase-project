/* eslint-env node */
module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'ember-firebase-project',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    firebase: {
      apiKey: null,
      authDomain: null,
      databaseURL: null,
      messagingSenderId: null,
      storageBucket: null,
    },

    url: {
      host: null,
      origin: null,
    },

    validation: {
      authentication: {
        maxEmailLength: 254,
        minEmailLength: 5,
        maxPasswordLength: 128,
        minPasswordLength: 6,
      },
    },
  };

  if (environment === 'development') {
    ENV.firebase.apiKey = 'AIzaSyDRaYc8tph-Zqgz7FtQT-r_PjQ2AyPwGHM';
    ENV.firebase.authDomain = 'ember-firebase-project.firebaseapp.com';
    ENV.firebase.databaseUrl = 'https://ember-firebase-project.firebaseio.com';
    ENV.firebase.messagingSenderId = '510055927933';
    ENV.firebase.storageBucket = 'ember-firebase-project.appspot.com';

    ENV.url.host = 'localhost:4200';
    ENV.url.origin = 'http://localhost:4200';
  }

  if (environment === 'test') {
    ENV.locationType = 'none'; // Testem prefers this
    ENV.APP.LOG_ACTIVE_GENERATION = false; // keep test console output quieter
    ENV.APP.LOG_VIEW_LOOKUPS = false; // keep test console output quieter
    ENV.APP.rootElement = '#ember-testing';

    // TODO: Create a Firebase project for testing, then set these values.
    ENV.firebase.apiKey = null;
    ENV.firebase.authDomain = null;
    ENV.firebase.databaseUrl = null;
    ENV.firebase.messagingSenderId = null;
    ENV.firebase.storageBucket = null;

    ENV.url.host = 'localhost:4200';
    ENV.url.origin = 'http://localhost:4200';
  }

  if (environment === 'production') {
    // TODO: Create a Firebase project for production, then set these values.
    ENV.firebase.apiKey = null;
    ENV.firebase.authDomain = null;
    ENV.firebase.databaseUrl = null;
    ENV.firebase.messagingSenderId = null;
    ENV.firebase.storageBucket = null;

    // TODO: Set up a production website, then set these values.
    ENV.url.host = null;
    ENV.url.origin = null;
  }

  return ENV;
};
