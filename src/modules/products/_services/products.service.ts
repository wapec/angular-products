import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { find, propEq, isEmpty } from 'ramda';

import {
  IProduct,
  IProductCustomAttribute,
} from '../_models/main-entities.models';
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
        const { items } = data;

        let products = items.slice(from, to);
        if (!isEmpty(filters)) {
          let filteredProducts = [];
          filters.some((f) => {
            const [fieldName, fieldValue] = f.split('-');
            filteredProducts = [
              ...filteredProducts,
              ...products.filter((item) => {
                // Price special case
                if (fieldName === 'price') {
                  const [lower, upper] = fieldValue.split('/');
                  const priceCondition =
                    item.price && item.price > +lower && item.price < +upper;
                  return priceCondition;
                }

                // Other fields process
                const foundMatch = find(propEq('attribute_code', fieldName))(
                  item.custom_attributes
                ) as IProductCustomAttribute;

                const foundMatchCondition =
                  foundMatch && foundMatch.value.includes(fieldValue);
                return foundMatchCondition;
              }),
            ];
          });
          products = filteredProducts;
        }
        const pagination = { page, perPage, total: items.length };
        return {
          products,
          pagination,
        };
      })
    );
  }
}
