
import config from 'ember-firebase-project/config/environment';

export function initialize(/* application */) {
  firebase.initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
  });
}

export default {
  name: 'initialize-firebase-app',
  initialize,
};
