import Router from 'ember-router';
import config from 'ember-firebase-project/config/environment';

const ProjectRouter = Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

// eslint-disable-next-line array-callback-return
ProjectRouter.map(function () {
  this.route('sign-in');
  this.route('private');
});

export default ProjectRouter;
