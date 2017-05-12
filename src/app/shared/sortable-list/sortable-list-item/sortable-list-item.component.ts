import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sortable-list-item',
  templateUrl: './sortable-list-item.component.html',
  styleUrls: ['./sortable-list-item.component.scss']
})
export class SortableListItemComponent implements OnInit {

    @Input() item: any;

    @Input() layout: string;

    @Input() root: string;

  constructor() { }

  ngOnInit() {
  }

}
