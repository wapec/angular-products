import { Component, Input } from '@angular/core';
import { isEmpty } from 'ramda';

import { IProduct } from '../../_models/main-entities.models';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  _list: IProduct[] = [];

  @Input() set list(payload: IProduct[]) {
    this._list = payload;
  }

  ngOnInit() {}

  isEmptyList() {
    return isEmpty(this._list);
  }
}
