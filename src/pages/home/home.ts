import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

// importacion de paginas
import { ClientsPage } from '../clients/clients';
import { SettingsPage } from '../settings/settings';
import { OrdersPage } from './../orders/orders';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public name_user: any;
	public user: any;
	public pieChartLabels:string[] = ['Compras', 'Ganancias', 'Ventas'];	
	public pieChartData:number[] = [100, 500, 300];
	public pieChartType:string = 'pie';

	public chartClicked(e:any):void {
		console.log(e);
	}

	public chartHovered(e:any):void {
		console.log(e);
	}
  // fin de grafico redondo
  // grafica lineal
	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	};

	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;

	public barChartData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
	];

  // events
	public chartClicked2(e:any):void {
		console.log(e);
	}

	public chartHovered2(e:any):void {
		console.log(e);
	}

	public randomize():void {
		let data = [
			Math.round(Math.random() * 100),
			59,
			80,
			(Math.random() * 100),
			56,
			(Math.random() * 100),
			40];
			let clone = JSON.parse(JSON.stringify(this.barChartData));
			clone[0].data = data;
			this.barChartData = clone;
	}// fin de grafica lineal

// CONSTRUCTOR ----------------------------------------------------------------------------------------
	constructor(public navCtrl: NavController, public menu: MenuController, public translateService: TranslateService, public navParams: NavParams) {
		this.menu.enable(true);
		this.name_user = sessionStorage.getItem('name');
		this.user = this.navParams.data;
	}

	ionViewCanEnter() {
		// console.log(this.name_user);
		let me = this;
		this.pieChartLabels.forEach(function(element, index) {
			me.translateService.get(element).subscribe(
				value => {
				console.log(value);
				me.pieChartLabels[index] = value;
				});
		  });
		this.pieChartLabels = me.pieChartLabels;
	}

	clients(){
		this.navCtrl.setRoot(ClientsPage);
	}

	settings(){
		this.navCtrl.setRoot(SettingsPage, this.user);
	}

	orders(){
		this.navCtrl.setRoot(OrdersPage);
	}
}