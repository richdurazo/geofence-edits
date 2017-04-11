import { Component, OnInit } from '@angular/core';

import { FilestackService } from './shared/filestack.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor (public filestack: FilestackService) {}


    ngOnInit () {
        this.filestack.initFilestack();
    }

}
