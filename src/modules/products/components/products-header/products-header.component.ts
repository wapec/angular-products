import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IPagination } from '../../_store/products.types';
import { DEFAULT_PAGE_SIZE_OPTIONS } from '../../_config/constants';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss'],
})
export class ProductsHeaderComponent {
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS;

  @Input() pagination: IPagination;
  @Output() proccessPaginatorPage = new EventEmitter<PageEvent>();

  proccessPaginatorPageHandler(event: PageEvent) {
    this.proccessPaginatorPage.emit(event);
  }
}
