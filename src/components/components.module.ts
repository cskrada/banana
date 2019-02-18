import { NgModule } from '@angular/core';
import { ListComponent } from './list/list';
import { GridComponent } from './grid/grid';
@NgModule({
	declarations: [ListComponent,
    GridComponent],
	imports: [],
	exports: [ListComponent,
    GridComponent]
})
export class ComponentsModule {}
