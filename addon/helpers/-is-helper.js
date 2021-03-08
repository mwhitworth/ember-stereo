import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';
import debug from 'debug';
import { tracked } from '@glimmer/tracking';
import hasEqualUrls from 'ember-hifi/utils/has-equal-urls';

const UNINITIALIZED = Object.freeze({});
@classic
export default class HifiBaseIsHelper extends Helper {
  @service hifi;
  
  identifier = UNINITIALIZED;
  @tracked sound = UNINITIALIZED
  
  /**
  returns the state
  @method compute
  @param {String} [url]
  @return {boolean}
  */

  compute([identifier]) {
    if (identifier !== this.identifier) {
      this.sound = UNINITIALIZED; // if identifier changes, reinitialize sound
      this.identifier = identifier || 'system';
      if (this.identifier !== 'system') {
        let sound = this.hifi.findLoaded(this.identifier)
        if (sound) {
          this.sound = sound;
        }
        else {
          this.hifi.on('new-load-request', async ({loadPromise, urlsOrPromise, options}) => {
            let isEqual = await hasEqualUrls(this.identifier, urlsOrPromise);
            if (isEqual) {
              loadPromise.then(({sound, failures}) => {
                this.sound = sound
              });
            }
          });
        }
      }
    }

    return this.result;
  }

  get result() {
    return false
  }
}