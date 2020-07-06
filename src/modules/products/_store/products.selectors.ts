import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProductsState } from './products.types';

export const productsStateSelector = createFeatureSelector<IProductsState>(
  'products'
);

export const productsListSelector = createSelector(
  productsStateSelector,
  (state: IProductsState) => state.productsList
);

export const productsPaginationSelector = createSelector(
  productsStateSelector,
  (state: IProductsState) => state.pagination
);

export const productsFiltersSelector = createSelector(
  productsStateSelector,
  (state: IProductsState) => state.filters
);

export const productsLoadedSelector = createSelector(
  productsStateSelector,
  (state: IProductsState) => state._loaded
);
