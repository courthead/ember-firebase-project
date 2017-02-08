import Controller from 'ember-controller';
import computed from 'ember-computed';

export default Controller.extend({
  providerData: computed('session.firebaseUser', function () {
    const fbUser = this.get('session.firebaseUser');
    return fbUser ?
           JSON.stringify(fbUser.providerData, null, 2) :
           null;
  }),
});
