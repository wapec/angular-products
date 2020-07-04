import { NgModule } from '@angular/core';

import { ProductsComponent } from './containers/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [ProductsRoutingModule],
  providers: [],
})
export class ProductsModule {}
