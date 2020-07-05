import { IGetProductsAction, GET_PRODUCTS } from './products.types';

// GET_PRODUCTS
export const getProductsAction = (payload: IGetProductsAction['payload']) => ({
  type: GET_PRODUCTS,
  payload,
});
