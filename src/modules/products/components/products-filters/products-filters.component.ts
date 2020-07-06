import { Component, Output, EventEmitter, Input } from '@angular/core';

import { IProductFilter, IProduct } from '../../_models/main-entities.models';
import { defineFiltersHelper } from '../../_helpers/filters-helper';

@Component({
  selector: 'app-products-filters',
  templateUrl: './products-filters.component.html',
  styleUrls: ['./products-filters.component.scss'],
})
export class ProductsFiltersComponent {
  _filters: IProductFilter[] = [];
  _list: IProduct[] = [];

  @Input() set list(payload: IProduct[]) {
    this._list = payload;
  }
  @Output() onFilterClick = new EventEmitter<string>();

  ngOnInit() {
    console.log('ngOnInit');
    if (this._list) {
      this._filters = defineFiltersHelper(this._list);
    }
  }

  filterClick(id: string) {
    this.onFilterClick.emit(id);
  }
}
