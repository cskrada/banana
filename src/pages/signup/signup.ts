
// importaciones de librerias
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { trigger,state, style, transition, animate } from '@angular/animations';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  animations: [
    trigger('itemState', [
      state('in', style({transform: 'translateX(0)'})),
      //Enter
      transition('void => *', [
        style({
          transform: 'translateX(-100%)'
        }),
        animate('300ms linear')
      ]),
      //Leave
      transition('* => void', animate('300ms ease-out', style({
        transform: 'translateX(100%)'
      }))),
    ])
  ]
})
export class SignupPage {

	items: any[] = [];


constructor(public navCtrl: NavController) {

	
	 
}
	ionViewDidLoad() {
  }
  
  

	add(){
		this.items.push({
		  title: 'item',
		  state: 'in'
    });
    console.log(this.items);
	  }
	
	  remove(){
    this.items.splice(0,1);
    console.log(this.items);
	  }
}