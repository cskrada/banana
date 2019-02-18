import { Component } from '@angular/core';


@Component({
  selector: 'grid',
  templateUrl: 'grid.html'
})
export class GridComponent {

  text: string;

  constructor() {
    console.log('Hello GridComponent Component');
    this.text = 'Hello World';
  }

}
