import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material/paginator';

import { DEFAULT_GET_PRODUCTS_PARAMS } from '../../_config/constants';
import { IProduct } from '../../_models/main-entities.models';
import { IProductsState, IPagination } from '../../_store/products.types';
import {
  getProductsAction,
  setFilterAction,
  clearFiltersAction,
} from '../../_store/products.actions';
import {
  productsListSelector,
  productsPaginationSelector,
  productsFiltersSelector,
  productsLoadedSelector,
} from '../../_store/products.selectors';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  productsList$: Observable<IProduct[]>;
  productsPagination$: Observable<IPagination>;
  productsFilters$: Observable<string[]>;
  productsLoaded$: Observable<boolean>;
  
  constructor(private _productsStore: Store<IProductsState>) {}

  ngOnInit() {
    this._productsStore.dispatch(
      getProductsAction({ data: DEFAULT_GET_PRODUCTS_PARAMS })
    );

    // Selectors
    this.productsList$ = this._productsStore.select(productsListSelector);
    this.productsPagination$ = this._productsStore.select(
      productsPaginationSelector
    );
    this.productsFilters$ = this._productsStore.select(productsFiltersSelector);
    this.productsLoaded$ = this._productsStore.select(productsLoadedSelector);
  }

  proccessPaginatorPage(event: PageEvent) {
    const { pageIndex, pageSize } = event;
    this._productsStore.dispatch(clearFiltersAction());
    this._productsStore.dispatch(
      getProductsAction({
        data: { page: pageIndex + 1, perPage: pageSize, filters: [] },
      })
    );
  }

  onFilterClick(id: string) {
    this._productsStore.dispatch(setFilterAction(id));
    this.productsPagination$
      .subscribe((pagination) => {
        const { page, perPage } = pagination;

        this.productsFilters$
          .subscribe((filters) => {
            this._productsStore.dispatch(
              getProductsAction({
                data: {
                  page,
                  perPage,
                  filters,
                },
              })
            );
          })
          .unsubscribe();
      })
      .unsubscribe();
  }
}
