import { Component } from '@angular/core';

import { IProductFilter } from '../../_models/main-entities.models';
import { DEFAULT_FILTERS_CONFIG } from '../../_config/filters-config';

@Component({
    selector: 'app-products-filters',
    templateUrl: './products-filters.component.html',
    styleUrls: ['./products-filters.component.scss'],
}) export class ProductsFiltersComponent {
    _filters: IProductFilter[] = DEFAULT_FILTERS_CONFIG;
}