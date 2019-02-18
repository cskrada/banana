import { Component } from '@angular/core';


@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent {

  text: string;

  constructor() {
    console.log('Hello ListComponent Component');
    this.text = 'Hello World';
  }

}
