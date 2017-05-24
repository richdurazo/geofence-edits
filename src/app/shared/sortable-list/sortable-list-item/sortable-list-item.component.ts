import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sortable-list-item',
  templateUrl: './sortable-list-item.component.html',
  styleUrls: ['./sortable-list-item.component.scss']
})
export class SortableListItemComponent implements OnInit {

    @Input() item: any;

    @Input() layout: string;

    @Input() root: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate () {
      this.router.navigate([this.root, this.item.id]);
  }

}
