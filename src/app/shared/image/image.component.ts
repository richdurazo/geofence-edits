import { Component, OnInit, Input } from '@angular/core';

import { FilestackService } from '../filestack.service';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

    @Input() uuid: string;

    @Input() key: string;

    mediaPath: string;

    constructor(public filestack: FilestackService) { }

    ngOnInit() {
        this.mediaPath = this.filestack.generateSaveFilePath(this.uuid, this.key, 'image');
    }

}
