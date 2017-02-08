import $ from 'jquery';
import Component from 'ember-component';
import config from 'ember-firebase-project/config/environment';

////////////////
//            //
//   Basics   //
//            //
////////////////

// This component only exists because Firebase UI's email/password option is
// garbage. It won't let you customize fields (e.g. forces you to ask for "First
// & last name"), decide what's required, re-enter an email address if it's
// incorrect the first time, etc.

// See https://firebase.google.com/docs/reference/js/firebase.auth.Auth

const EmailSignInComponent = Component.extend({
  classNames: ['email-sign-in'],

  submissionInProgress: false,

  async _createUser(email, password) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      switch (e.code) {
        case 'auth/email-already-in-use':
          throw new Error('That email address is taken.');
        case 'auth/invalid-email':
          throw new Error('Invalid email address.');
        case 'auth/operation-not-allowed':
          throw new Error('Signing up via email/password has been disabled.');
        case 'auth/weak-password':
          throw new Error('Please create a stronger password.');
        default:
          console.error(e); // eslint-disable-line no-console
          throw new Error('An error occurred.');
      }
    }
  },

  async _signIn(email, password) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          throw new Error('Invalid email address.');
        case 'auth/user-disabled':
          throw new Error('Your account is disabled.');
        case 'auth/user-not-found':
          throw new Error('No account exists for this email address.');
        case 'auth/wrong-password':
          throw new Error('Incorrect password.');
        default:
          console.error(e); // eslint-disable-line no-console
          throw new Error('An error occurred.');
      }
    }
  },

  actions: {
    async submit(submitEvent) {
      try {
        submitEvent.preventDefault();

        this.set('submissionInProgress', true);

        const { email, password } = this._validateFields();
        const providers = await firebase.auth().fetchProvidersForEmail(email);
        if (providers.includes('password')) {
          await this._signIn(email, password);
        } else {
          await this._createUser(email, password);
        }

        const isAuthenticated = await this.get('session').checkAuthStatus();
        this.get('attrs.finish-sign-in')(isAuthenticated);

      } catch (e) {
        if (e.code === 'auth/invalid-email') {
          // Might be thrown by `firebase.auth().fetchProvidersForEmail`.
          this.set('errorMessage', 'Invalid email adddress.');
        } else {
          this.set('errorMessage', e.message);
        }

      } finally {
        this.set('submissionInProgress', false);
      }
    },
  },
});

////////////////////
//                //
//   Validation   //
//                //
////////////////////

const {
  maxEmailLength,
  minEmailLength,
  maxPasswordLength,
  minPasswordLength,
} = config.validation.authentication;

EmailSignInComponent.reopen({
  errorMessage: '',

  maxPasswordLength,

  maxEmailLength,

  // We don't need better validation than this because Firebase will handle it.
  _getEmailErrorMessage(email) {
    if (!email) {
      return 'Please enter your email address.';
    } else if (email.length < minEmailLength) {
      return 'Invalid email address.';
    } else if (email.length > maxEmailLength) {
      return 'Invalid email address.';
    }
  },

  _getPasswordErrorMsg(password) {
    if (!password) {
      return 'Please enter a password.';
    } else if (password.length < minPasswordLength) {
      return `Password must be at least ${minPasswordLength} characters long.`;
    } else if (password.length > maxPasswordLength) {
      return `Password cannot be longer than ${maxPasswordLength} characters.`;
    }
  },

  _validateFields() {
    this.set('errorMessage', '');

    const $el = $(this.get('element'));
    const $emailInput = $el.find('.email-sign-in__field--email');
    const email = $emailInput.val();
    const emailErrMsg = this._getEmailErrorMessage(email);

    const $passwordInput = $el.find('.email-sign-in__field--password');
    const password = $passwordInput.val();
    const passwordErrMsg = this._getPasswordErrorMsg(password);

    if (emailErrMsg || passwordErrMsg) {
      throw new Error(emailErrMsg || passwordErrMsg);
    }

    return { email, password };
  },
});

export default EmailSignInComponent;
