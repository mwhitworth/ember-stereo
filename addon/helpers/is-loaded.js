import classic from 'ember-classic-decorator';
import HifiBaseIsHelper from './hifi-base-is-helper';

/**
  A helper to detect if a sound is loaded.
  ```hbs
    {{#if (is-loaded this.url)}}
      <p>The currently loaded sound is loaded</p>
    {{else}}
      <p>The currently loaded sound is not loaded</p>
    {{/if}}
  ```

  Can also look for the currently loaded sound without an argument
  ```hbs
    {{#if (is-loaded)}}
      <p>The currently loaded sound is loaded</p>
    {{else}}
      <p>There is no current sound</p>
    {{/if}}
  ```

  @class HifiIsLoaded
  @type Helper
  @param {String} url
*/

@classic
export default class HifiIsLoaded extends HifiBaseIsHelper {
  name = 'is-loaded'
  listen = ['audio-loaded', 'audio-loading', 'audio-ended']

  checkSystem() {
    if (this.hifi.currentSound) {
      return this.checkSound(this.hifi.currentSound);
    }
    else {
      return false;
    }
  }

  checkSound(sound) {
    return !!sound;
  }

  /**
    returns the state
    @method compute
    @param {String} [url]
    @return {boolean}
  */

  /* inherited */
}