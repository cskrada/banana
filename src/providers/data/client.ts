// importaciones de librerias 
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ClientProvider {

// variable tipo arreglo de datos estaticos
items: any;

constructor(public http: Http) {

	this.initializeItems();

} // fin del constructor

	initializeItems(){
		this.items = [
	    	{
	    		id: '01',
	    		name: 'pepsico, CA',
	    		razons: 'comerciales aurora',
	    		alias: 'pepsicola',
	    		rif: 'J-789456123',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Caracas',
	    		state: 'Dtto. Capital',
	    		phone: '584569878',
	    		email: 'pepsico@gmail.com'
	    	},
	    	{
	    		id: '02',
	    		name: 'cocacola, CA',
	    		razons: 'distribuidora gaseosa',
	    		alias: 'cocacola',
	    		rif: 'J-123456789',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Caracas',
	    		state: 'Dtto. Capital',
	    		phone: '584124568989',
	    		email: 'cocacola@gmail.com'
	    	},
	    	{
	    		id: '03',
	    		name: 'seguros caracas',
	    		razons: 'seguro caracas oficial',
	    		alias: 'poliza de seguro',
	    		rif: 'J-951753258',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Puerto Ayacucho',
	    		state: 'Amazonas',
	    		phone: '584143198569',
	    		email: 'seguros-online@gmail.com'
	    	},
	    	{
	    		id: '04',
	    		name: 'frito lay',
	    		razons: 'tu dorito',
	    		alias: 'pepitos',
	    		rif: 'J-789555666',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Caracas',
	    		state: 'Dtto. Capital',
	    		phone: '584145235566',
	    		email: 'papalays@gmail.com'
	    	},
	    	{
	    		id: '05',
	    		name: 'canal i',
	    		razons: 'intendencia',
	    		alias: 'canal i',
	    		rif: 'J-852582558',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Pueblo Nuevo',
	    		postalcode: '1021',
	    		city: 'San Cristobal',
	    		state: 'Tachira',
	    		phone: '584144562233',
	    		email: 'canal-i-so@gmail.com'
	    	},
	    	{
	    		id: '06',
	    		name: 'pepito',
	    		razons: 'frito lay',
	    		alias: 'pepito',
	    		rif: 'J-147741147',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Trujillo',
	    		state: 'Trujillo',
	    		phone: '584141234455',
	    		email: 'pepito-@gmail.com'
	    	},
	    	{
	    		id: '07',
	    		name: 'alfonzo rivas',
	    		razons: 'flips',
	    		alias: 'flips',
	    		rif: 'J-555666123',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Puerto Ayacucho',
	    		state: 'Amazonas',
	    		phone: '584141126369',
	    		email: 'alfonsito@gmail.com'
	    	},
	    	{
	    		id: '08',
	    		name: 'farmatodo',
	    		razons: 'farmacia la delicia',
	    		alias: 'farmatodo',
	    		rif: 'J-114225336',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'San Fernando de Apure',
	    		state: 'Apure',
	    		phone: '584145896969',
	    		email: 'farmatodo-compras@gmail.com'
	    	},
	    	{
	    		id: '09',
	    		name: 'samsung',
	    		razons: 'fabrica de ensamble',
	    		alias: 'samsung',
	    		rif: 'J-145263526',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Mérida',
	    		state: 'Merida',
	    		phone: '584125551212',
	    		email: 'samsung-compras@gmail.com'
	    	},
	    	{
	    		id: '10',
	    		name: 'nokia',
	    		razons: 'fabrica de ensamble',
	    		alias: 'nokia',
	    		rif: 'J-444555666',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Coro',
	    		state: 'Falcon',
	    		phone: '584143198569',
	    		email: 'csak@gmail.com'
	    	},
	    	{
	    		id: '11',
	    		name: 'locatel',
	    		razons: 'farmacia fantasia',
	    		alias: 'locatel',
	    		rif: 'J-896598778',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Maracay',
	    		state: 'Aragua',
	    		phone: '584143198569',
	    		email: 'locatel-f@gmail.com'
	    	},
	    	{
	    		id: '12',
	    		name: 'mng',
	    		razons: 'tu tiendita bella',
	    		alias: 'frufru',
	    		rif: 'J-789888777',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Maracaibo',
	    		state: 'Zulia',
	    		phone: '584143198569',
	    		email: 'mng-info@gmail.com'
	    	},
	    	{
	    		id: '13',
	    		name: 'papajhons',
	    		razons: 'pizzeria la nona',
	    		alias: 'papa jhons',
	    		rif: 'J-887998889',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Los teques',
	    		state: 'Miranda',
	    		phone: '584143198569',
	    		email: 'papajhons@gmail.com'
	    	},
	    	{
	    		id: '14',
	    		name: 'locatel',
	    		razons: 'farmacia beauty',
	    		alias: 'locatel',
	    		rif: 'J-111458236',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Los Teques',
	    		state: 'Miranda',
	    		phone: '584143198569',
	    		email: 'locatel-b@gmail.com'
	    	},
	    	{
	    		id: '15',
	    		name: 'locatel',
	    		razons: 'farmacia boleita',
	    		alias: 'locatel',
	    		rif: 'J-123321123',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Los Teques',
	    		state: 'Miranda',
	    		phone: '584143198569',
	    		email: 'csak@gmail.com'
	    	},
	    	{
	    		id: '16',
	    		name: 'locatel',
	    		razons: 'farmacia san luis',
	    		alias: 'locatel',
	    		rif: 'J-456951753',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Los Teques',
	    		state: 'Miranda',
	    		phone: '584143198569',
	    		email: 'csak@gmail.com'
	    	},
	    	{
	    		id: '17',
	    		name: 'locatel',
	    		razons: 'farmacia caracas grande',
	    		alias: 'locatel',
	    		rif: 'J-147852369',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Los Teques',
	    		state: 'Miranda',
	    		phone: '584143198569',
	    		email: 'csak@gmail.com'
	    	}
	    	,
	    	{
	    		id: '18',
	    		name: 'locatel',
	    		razons: 'farmacia San luisito',
	    		alias: 'locatel',
	    		rif: 'J-314073354',
	    		address: 'Av. transversal de Francisco Miranda en la calle baruta de esquina el tepuy, edif 11',
	    		region: 'Boleíta Norte',
	    		postalcode: '1021',
	    		city: 'Los Teques',
	    		state: 'Miranda',
	    		phone: '584143198569',
	    		email: 'locatel-compras@gmail.com'
	    	}
    	]; // fin de arreglo de objetos
	} //fin InitialzeItems()


	filterItems(searchTerm){
		return this.items.filter((item) => {
			return item.name.toLowerCase()
			.includes(searchTerm.toLowerCase()) || 
			item.razons.toLowerCase()
			.includes(searchTerm.toLowerCase()) ||
			item.alias.toLowerCase()
			.includes(searchTerm.toLowerCase());
		});
	}

	orderList(items){
		this.filterItems;

		this.items.sort(function ( a , b ) {
			if (a.razons > b.razons) {
				return 1;
			}
			if (a.razons < b.razons) {
				return -1;
			}
			// a must be equal to b
			return 0;
		});
	}

}