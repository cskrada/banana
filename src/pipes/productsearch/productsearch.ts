import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsearch',
})
export class ProductsearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
