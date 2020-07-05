import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IProductsState } from './products.types';

export const productsStateSelector = createFeatureSelector<IProductsState>(
  'products'
);

export const productsListSelector = createSelector(
  productsStateSelector,
  (state: IProductsState) => state.productsList
);
