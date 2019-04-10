import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search';
import { SortPipe } from './sort/sort';
import { SearchproductPipe } from './searchproduct/searchproduct';
@NgModule({
	declarations: [SearchPipe,
    SortPipe,
    SearchproductPipe],
	imports: [],
	exports: [SearchPipe,
    SortPipe,
    SearchproductPipe]
})
export class PipesModule {}
