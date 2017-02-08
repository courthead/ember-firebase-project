export function initialize(application) {
  application.inject('adapter', 'session', 'service:session');
  application.inject('component', 'session', 'service:session');
  application.inject('controller', 'session', 'service:session');
  application.inject('route', 'session', 'service:session');
}

export default {
  name: 'inject-session',
  initialize,
};
