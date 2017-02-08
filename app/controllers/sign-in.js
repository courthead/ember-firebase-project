import Controller from 'ember-controller';

export default Controller.extend({
  actions: {
    signIn(isAuthenticated) {
      if (isAuthenticated) {
        this.transitionToRoute('private');
      } else {
        // eslint-disable-next-line no-alert
        alert('Sign in failed for some reason.');
      }
    },
  },
});
