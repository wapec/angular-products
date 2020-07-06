import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

import { DEFAULT_GET_PRODUCTS_PARAMS } from '../../_config/constants';
import { IProductsState } from '../../_store/products.types';
import {
  getProductsAction,
  setFilterAction,
} from '../../_store/products.actions';
import { productsStateSelector } from '../../_store/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productsState$: Observable<IProductsState>;

  constructor(private _productsStore: Store<IProductsState>) {}

  ngOnInit() {
    this._productsStore.dispatch(
      getProductsAction({ data: DEFAULT_GET_PRODUCTS_PARAMS })
    );
    this.productsState$ = this._productsStore.select(productsStateSelector);
  }

  proccessPaginatorPage(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    this._productsStore.dispatch(
      getProductsAction({ data: { page: pageIndex + 1, perPage: pageSize, filter: [] } })
    );
  }

  onFilterClick(id: string) {
    console.log(id);
    this._productsStore.dispatch(setFilterAction(id));
  }
}
