import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-selectable-list-item',
  templateUrl: './selectable-list-item.component.html',
  styleUrls: ['./selectable-list-item.component.scss']
})
export class SelectableListItemComponent implements OnInit {

    @Input() item: any;

    @Input() root: string;

  constructor() { }

  ngOnInit() {
      console.log('item', this.item);
      console.log('root', this.root);
  }

}
