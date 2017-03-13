declare var moment: any;
///<reference path="../../../../node_modules/moment/moment.d.ts" />
import { Injectable } from '@angular/core';

@Injectable()
export class DateUtilsService {

  constructor() { }

  public formatSQLDate (date) {
      return moment(new Date(date)).format("YYYY-MM-DD HH:mm:ss");
  }

}
