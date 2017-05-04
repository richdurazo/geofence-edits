import { Component, OnInit, Input } from '@angular/core';

import { FilestackService } from '../filestack.service';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

    @Input() uuid: string;

    @Input() key: string;

    mediaPath: string;

    constructor(public filestack: FilestackService) { }

    ngOnInit() {
        this.mediaPath = this.filestack.generateSaveFilePath(this.uuid, this.key, 'image');
    }

}
