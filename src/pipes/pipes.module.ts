import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { SortPipe } from './sort/sort';
import { SearchproductPipe } from './searchproduct/searchproduct';
import { ProductsearchPipe } from './productsearch/productsearch';
@NgModule({
	declarations: [SearchPipe,
    SortPipe,
    SearchproductPipe,
    ProductsearchPipe],
	imports: [],
	exports: [SearchPipe,
    SortPipe,
    SearchproductPipe,
    ProductsearchPipe]
})
export class PipesModule {}