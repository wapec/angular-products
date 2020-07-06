import {
  IGetProductsAction,
  GET_PRODUCTS,
  ISetFilterAction,
  SET_FILTER,
  IClearFiltersAction,
  CLEAR_FILTERS,
} from './products.types';

// GET_PRODUCTS
export const getProductsAction = (payload: IGetProductsAction['payload']) => ({
  type: GET_PRODUCTS,
  payload,
});

// SET_FILTER
export const setFilterAction = (payload: ISetFilterAction['payload']) => ({
  type: SET_FILTER,
  payload,
});

// CLEAR_FILTERS
export const clearFiltersAction = () => ({
  type: CLEAR_FILTERS,
});
