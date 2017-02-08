import Controller from 'ember-controller';

export default Controller.extend({
  actions: {
    signOut() {
      this.get('session').signOut().then(() => this.transitionToRoute('index'));
    },
  },
});
