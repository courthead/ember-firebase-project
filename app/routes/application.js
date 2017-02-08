import Route from 'ember-route';
import exposeDevelopmentHelpers from 'ember-firebase-project/utils/expose-development-helpers';

export default Route.extend({
  beforeModel() {
    this._super(...arguments);

    exposeDevelopmentHelpers(this);
    this.get('session').checkAuthStatus();
  },
});
