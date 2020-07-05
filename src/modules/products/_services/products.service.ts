import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isEmpty } from 'ramda';

import { IProduct } from '../_models/main-entities.models';
import { GetProductsParams, IPagination } from '../_store/products.types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  getProducts(
    params: GetProductsParams
  ): Observable<{ products: IProduct[]; pagination: IPagination }> {
    console.log(params);
    const { page, perPage } = params;
    const [from, to] = [
      page === 1 ? 0 : perPage * (page - 1),
      page === 1 ? perPage - 1 : perPage * page - 1,
    ];

    console.log(from, to);

    return this._http.get('/assets/products.json').pipe(
      map((data: { items: IProduct[] }) => {
        const { items } = data;
        return {
          products: items.slice(from, to),
          pagination: { page, perPage, total: items.length },
        };
      })
    );
  }
}
