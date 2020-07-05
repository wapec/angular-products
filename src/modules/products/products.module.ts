import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ProductsComponent } from './containers/products/products.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductItem } from './components/product-item/product-item.component';
import { ProductsFiltersComponent } from './components/products-filters/products-filters.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsEffects } from './_store/products.effects';
import { productsReducer } from './_store/products.reducers';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductItem,
    ProductsFiltersComponent,
    ProductsHeaderComponent,
  ],
  imports: [
    ProductsRoutingModule,
    CommonModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  providers: [],
})
export class ProductsModule {}
