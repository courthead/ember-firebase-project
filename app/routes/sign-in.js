import Route from 'ember-route';

export default Route.extend({
  async beforeModel() {
    this._super(...arguments);

    if (this.get('session.firebaseUser')) {
      this.transitionTo('private');
    } else {
      const authed = await this.get('session').checkAuthStatus();
      if (authed) {
        this.transitionTo('private');
      }
    }
  },
});
