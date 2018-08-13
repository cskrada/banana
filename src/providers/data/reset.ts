// importaciones de librerias 
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ResetProvider {

items: any;

constructor(public http: Http) {
 this.items = this.getClients();
console.log(this.items);
}
    getClients() {
        return this.http.get('https://randomuser.me/api/?results=25');
    }

	filterItemsHttp(searchTerm){
		return this.items.filter((item) => {
			return item.name.first.toLowerCase()
			.includes(searchTerm.toLowerCase());
		});
	}

	orderListHttp(items){
		this.filterItemsHttp;

		this.items.sort(function ( a , b ) {
			if (a.name.first > b.name.first) {
				return 1;
			}
			if (a.name.first < b.name.first) {
				return -1;
			}
			return 0;
		});
	}

}