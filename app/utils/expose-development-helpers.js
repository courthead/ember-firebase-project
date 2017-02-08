import $ from 'jquery';
import { getOwner } from 'ember-owner/get';

export default function exposeDevelopmentHelpers(applicationRoute) {
  // Create a global `$E` variable holding an instance of the application route.
  window.$E = applicationRoute;

  // Create a jQuery helper function called `getComponent`. When called on a
  // jQuery-wrapped element, it will return an instance of the component that
  // controls that element. If the element specified does not correspond to a
  // component, the function will walk up the tree of parents until it reaches
  // an element that does. For example:
  //
  //     $('.my-element').getComponent() ==> <instance of MyElementComponent>
  //
  $.fn.getComponent = function () {
    let $el = this;
    let component;
    const container = getOwner(applicationRoute);

    while ($el.length && !component) {
      const id = $el.attr('id');
      component = container.lookup('-view-registry:main')[id];

      if (!component) {
        $el = $el.parent();
      }
    }

    return component;
  };
}
