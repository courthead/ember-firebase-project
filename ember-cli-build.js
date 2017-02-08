/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const envFn = require('./config/environment.js');

module.exports = function (defaults) {
  ////////////////////
  //                //
  //   Set Up App   //
  //                //
  ////////////////////

  const envName = EmberApp.env();
  const config = envFn(envName); // eslint-disable-line no-unused-vars
  const isDevEnv = envName === 'development';
  const isProdEnv = envName === 'production';
  const isTestEnv = envName === 'test';
  const options = {};

  // ember-cli
  options.minifyCSS = { enabled: isProdEnv };
  options.sourcemaps = { enabled: isDevEnv || isTestEnv };

  // ember-cli-babel
  options['ember-cli-babel'] = { includePolyfill: true }; // async/await support

  // ember-cli-sass
  options.sassOptions = { sourceMap: isDevEnv };

  // ember-cli-uglify
  options.minifyJS = { enabled: isProdEnv };

  const app = new EmberApp(defaults, options);

  //////////////////////////
  //                      //
  //   Add Vendor Files   //
  //                      //
  //////////////////////////

  // ...

  /////////////////////
  //                 //
  //   Modify Tree   //
  //                 //
  /////////////////////

  // ...

  return app.toTree();
};
