import {
  IProductsState,
  ProductsTypes,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from './products.types';

const initialState: IProductsState = {
  productsList: [],
  pagination: null,
  _error: null,
  _pending: false,
  _loaded: false,
};

export const productsReducer = (state = initialState, action: ProductsTypes) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        _pending: true,
        _loaded: false,
      };
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsList: action.payload.products,
        pagination: action.payload.pagination,
        _pending: false,
        _loaded: true,
      };
    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        _pending: false,
        _loaded: false,
        _error: action.payload,
      };

    default:
      return state;
  }
};
