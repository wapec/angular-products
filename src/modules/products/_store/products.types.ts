import { HttpErrorResponse } from '@angular/common/http';

import { IProduct } from '../_models/main-entities.models';

export interface IPagination {
  page: number;
  perPage: number;
  total: number;
}

export interface IProductsState {
  productsList: IProduct[];
  pagination: IPagination | null;
  _pending: boolean;
  _loaded: boolean;
  _error: HttpErrorResponse;
}

// GET_PRODUCTS
export const GET_PRODUCTS = '[@@Products] GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = '[@@Products] GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = '[@@Products] GET_PRODUCTS_FAIL';

export type GetProductsParams = {
  page: number;
  perPage: number;
};

export interface IGetProductsAction {
  type: typeof GET_PRODUCTS;
  payload: {
    data: GetProductsParams;
    callback?: () => void;
  };
}

export interface IGetProductsActionSuccess {
  type: typeof GET_PRODUCTS_SUCCESS;
  payload: {
    products: IProduct[];
    pagination: IPagination;
  };
}

export interface IGetProductsActionFail {
  type: typeof GET_PRODUCTS_FAIL;
  payload: HttpErrorResponse;
}

export type ProductsTypes =
  | IGetProductsAction
  | IGetProductsActionSuccess
  | IGetProductsActionFail;
