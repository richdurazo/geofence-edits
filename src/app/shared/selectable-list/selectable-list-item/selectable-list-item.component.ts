import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selectable-list-item',
  templateUrl: './selectable-list-item.component.html',
  styleUrls: ['./selectable-list-item.component.scss']
})
export class SelectableListItemComponent implements OnInit {

    @Input() item: any;

    @Input() root: string;

    @Input() selectedItem: any;

  constructor() { }

  ngOnInit() {
      if (!this.selectedItem) {
          this.selectedItem = { id: null };
      }
  }

}
