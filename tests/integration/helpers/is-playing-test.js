import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, getContext } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import isPlayingHelper from 'dummy/helpers/is-playing';
import Hifi from 'dummy/services/hifi';

module('Integration | Helper | is-playing', function(hooks) {
  setupRenderingTest(hooks);
 
  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/10/silence.mp3')
    await render(hbs`{{#if (is-playing this.url)}}is-playing{{else}}is-not-playing{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-playing');
    await service.play(this.url)
    assert.equal(service.isPlaying, true);
    assert.equal(this.element.textContent.trim(), 'is-playing');
  });

  test('it renders system playing status without arguments', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/10/silence.mp3')
    await render(hbs`{{#if (is-playing)}}is-playing{{else}}is-not-playing{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-playing');
    await service.play(this.url)
    assert.equal(service.isPlaying, true);
    assert.equal(this.element.textContent.trim(), 'is-playing');
  });

  test('it renders correct status if sound changes', async function(assert) {
    let service = this.owner.lookup('service:hifi')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/good/10/silence.mp3')
    await render(hbs`{{#if (is-playing this.url)}}is-playing{{else}}is-not-playing{{/if}}`);
    await service.play(this.url)
    assert.equal(this.element.textContent.trim(), 'is-playing');
    this.set('url2', '/good/5/second-silence.mp3')
    await service.play(this.url2);
    assert.equal(service.isPlaying, true);
    assert.equal(this.element.textContent.trim(), 'is-not-playing');
  });
});
