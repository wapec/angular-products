import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { find, propEq, isEmpty } from 'ramda';

import { IProduct } from '../_models/main-entities.models';
import { processProducts } from '../_helpers/products-helper';
import { GetProductsParams, IPagination } from '../_store/products.types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(
    params: GetProductsParams
  ): Observable<{ products: IProduct[]; pagination: IPagination }> {
    const { page, perPage, filters } = params;
    const [from, to] = [
      page === 1 ? 0 : perPage * (page - 1),
      page === 1 ? perPage - 1 : perPage * page - 1,
    ];

    return this._http.get('/assets/products.json').pipe(
      map((data: { items: IProduct[] }) => {
        const { pagination, products } = processProducts({
          data,
          filters,
          perPage,
          page,
          from,
          to,
        });
        
        return {
          products,
          pagination,
        };
      })
    );
  }
}
