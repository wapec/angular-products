import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';

import { ProductsService } from '../_services/products.service';
import {
  IGetProductsAction,
  IGetProductsActionSuccess,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
} from './products.types';

@Injectable()
export class ProductsEffects {
  constructor(
    private _actions: Actions,
    private _productsService: ProductsService
  ) {}

  @Effect()
  getProductsEffect = this._actions.pipe(
    ofType<IGetProductsAction>(GET_PRODUCTS),
    map((action: IGetProductsAction) => action.payload),
    switchMap(({ data: { page, perPage, filters } }) => {
      return this._productsService.getProducts({ page, perPage, filters }).pipe(
        map((payload: IGetProductsActionSuccess['payload']) => ({
          type: GET_PRODUCTS_SUCCESS,
          payload,
        })),
        catchError((error: HttpErrorResponse) =>
          of({ type: GET_PRODUCTS_FAIL, payload: error })
        )
      );
    })
  );
}
