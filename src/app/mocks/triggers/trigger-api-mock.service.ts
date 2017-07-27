import { Injectable } from '@angular/core';

@Injectable()
export class TriggerApiMockService {

    constructor() {}

    getTriggers () {
      return false;
    }

    getTrigger () {
      return false;
    }

    createTrigger () {
      return false;
    }

    deleteTrigger () {
      return false;
    }
    createTouchTrigger(data) {
      return false;
    }
    createGeofenceTrigger(data) {
      return false;
    }
    createBeaconTrigger(data) {
      return false;
    }
    createAudioTrigger(data) {
      return false;
    }
    getTriggerContentGroups(data) {
      return false;
    }
}
