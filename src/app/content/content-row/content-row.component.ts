import { Component, OnInit, Input } from '@angular/core';

import { ContentModel } from '../shared/content.model';
@Component({
  selector: 'app-content-row',
  templateUrl: './content-row.component.html',
  styleUrls: ['./content-row.component.scss']
})
export class ContentRowComponent implements OnInit {

    @Input() item: ContentModel;

    @Input() layout: string;

  constructor() { }

  ngOnInit() {
      console.log('this.item', this.item);
      console.log('this.layout', this.layout);
  }

}
