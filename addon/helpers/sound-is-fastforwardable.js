import StereoBaseIsHelper from 'ember-stereo/-private/helpers/is-helper';
import debug from 'debug';

/**
  A helper to detect if a sound is fast-forwardable.
  ```hbs
    {{#if (sound-is-fastforwardable this.url)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (sound-is-fastforwardable)}}
      <p>The currently loaded sound is fast-forwardable</p>
    {{else}}
      <p>The currently loaded sound is not fast-forwardable</p>
    {{/if}}
  ```

  @class {{sound-is-fastforwardable}}
  @type Helper
  @param {String} url
*/

export default class SoundIsFastForwardable extends StereoBaseIsHelper {
  get result() {
    if (this.identifier === 'system') {
      debug(`ember-stereo:helpers:sound-is-fastforwardable:${this.identifier}`)(`render = ${this.stereo.isFastForwardable}`)
      return this.stereo.isFastForwardable;
    }
    else {
      debug(`ember-stereo:helpers:sound-is-fastforwardable:${this.identifier}`)(`render = ${this.sound?.isFastForwardable}`)
      return this.sound?.isFastForwardable;
    }
  }
}
