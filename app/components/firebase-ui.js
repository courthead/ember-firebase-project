import Component from 'ember-component';
import config from 'ember-firebase-project/config/environment';

export default Component.extend({
  classNames: ['firebase-ui'],

  fbAuthUIInstance: null,

  widgetIsLoading: true,

  didInsertElement() {
    this._super(...arguments);

    window.firebaseAuthUiObj = window.firebaseAuthUiObj ||
                               new firebaseui.auth.AuthUI(firebase.auth());

    // See https://github.com/firebase/firebaseui-web#configuration.
    window.firebaseAuthUiObj.start(this.get('element'), {
      callbacks: {
        signInSuccess: (/* firebaseUser, credential, redirectUrl */) => {
          this.get('session').checkAuthStatus().then(isAuthenticated => {
            this.get('attrs.finish-sign-in')(isAuthenticated);
          });
          return false; // returning false prevents a redirect
        },
        uiShown: () => this.set('widgetIsLoading', false),
      },
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInFlow: 'popup', // vs "redirect"
      signInOptions: [
        // See the email-sign-in component instead.
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        {
          provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          scopes: [],
        },
        {
          provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
          scopes: [],
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          scopes: [],
        },
        firebase.auth.TwitterAuthProvider.PROVIDER_ID, // no scope support
      ],
      tosUrl: config.firebase.tosUrl,
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    if (window.firebaseAuthUiObj) {
      window.firebaseAuthUiObj.reset();
    }
  },
});
