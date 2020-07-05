import { Component, Input } from '@angular/core';
import { find, propEq } from 'ramda';

import {
  IProduct,
  IProductCustomAttribute,
} from '../../_models/main-entities.models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItem {
  _item: IProduct = null;

  @Input() set item(payload: IProduct) {
    this._item = payload;
  }

  getItemThumbnail() {
    const foundedAttributte = find(propEq('attribute_code', 'thumbnail'))(
      this._item.custom_attributes
    ) as IProductCustomAttribute;
    if (foundedAttributte) return foundedAttributte.value;
    return '#';
  }
}
