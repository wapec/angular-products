import {
  IGetProductsAction,
  GET_PRODUCTS,
  ISetFilterAction,
  SET_FILTER,
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
