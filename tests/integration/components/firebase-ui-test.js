import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('firebase-ui', 'Integration | Component | firebase ui', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{firebase-ui}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#firebase-ui}}
      template block text
    {{/firebase-ui}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
