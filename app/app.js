import Ember from 'ember';
import Resolver from './resolver';
import config from 'ember-firebase-project/config/environment';
import loadInitializers from 'ember-load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
