import RSVP from 'rsvp';
import Service from 'ember-service';

export default Service.extend({
  checkingAuthPromise: null, // helps handle multiple simultaneous auth checks

  hasCheckedAuth: false,

  // Will be set to a firebase.User instance when auth'd. It has properties like
  // `displayName`, `email`, `photoURL`, `providerData`, `providerId`, and
  // `uid`. See https://firebase.google.com/docs/reference/js/firebase.User.
  firebaseUser: null,

  // Returns a promise that resolves to `true` if the user is authenticated or
  // `false` otherwise. Also updates the `firebaseUser` property accordingly.
  checkAuthStatus() {
    // This helps avoid wasteful simultaneous auth checks.
    if (this.get('checkingAuthPromise')) {
      return this.get('checkingAuthPromise');
    }

    this.set('isCheckingAuth', true);

    const promise = new RSVP.Promise(resolve => {
      const killWatcher = firebase.auth().onAuthStateChanged(firebaseUser => {
        killWatcher();

        this.set('hasCheckedAuth', true);
        this.set('checkingAuthPromise', null);
        this.set('isCheckingAuth', false);
        this.set('firebaseUser', firebaseUser || null);

        resolve(!!firebaseUser);
      });
    });

    this.set('checkingAuthPromise', promise);

    return promise;
  },

  signOut() {
    return firebase.auth().signOut().then(() => this.set('firebaseUser', null));
  },
});
