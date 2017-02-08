import Route from 'ember-route';

export default Route.extend({
  async beforeModel() {
    this._super(...arguments);

    if (!this.get('session.firebaseUser')) {
      const authed = await this.get('session').checkAuthStatus();
      if (!authed) {
        this.transitionTo('sign-in');
      }
    }
  },
});
