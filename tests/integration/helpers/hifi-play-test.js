import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | hifi-play', function(hooks) {
  setupRenderingTest(hooks);

  test('it can play as an action', async function(assert) {
    let service = this.owner.lookup('service:hifi');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/1000/silence.mp3';
    assert.equal(service.isPlaying, false, 'not playing');
    await render (hbs`<button type="button" {{on 'click' (hifi-play this.url)}}>play</button>`);
    await click('button');

    assert.equal(service.isPlaying, true, 'is playing');
  });
});
