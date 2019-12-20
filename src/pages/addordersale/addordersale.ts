import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController, ViewController} from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { constants } from './../../const/const';
import { TranslateService } from '@ngx-translate/core';
import { trigger,state, style, transition, animate } from '@angular/animations';


export class HeaderProject {
  id: number = 0;
  bpartner_id: number = null;
  organization_id: number | string = null;
}
​
export class Document {
  id: number = 0;
  counter_serie_id: number = null;
  bpartner_id: number = null;
  reference: string = '';
  header_project_id: number = null;
  address: string = '';
  valid_from: string = '';
  valid_until: string = '';
  warehouse_id: number = null;
  sale_represent_id: number = null;
  price_list_id: number = null;
  currency_client: number = null;
  currency_document: number = null;
  rate: any = '';
  // Cuando se crea un documento se establece que tiene el estado 1 "Pendiente"
  status_id: number = 1;
  based: boolean = false;
}

class BodyDocument {
  id: number = 0;
  reference_document: string = null;
  reference: string = '';
  product_detail_id: number = null;
  name: string = '';
  price: any = '0';
  net_price: any = '0';
  dimensions: any = '1';
  quantity: any = '1';
  quantity_processed: any = '0';
  quantity_to_process: any = '0';
  discount: any = '0';
  discount_cal: any = '0';
  tax_id: number = null;
  sale_rep_id: number = null;
  warehouse_id: number = null;
  origin_document: string = null;
  origin_row: number = null;
}

class FooterDocument {
  id: number = 0;
  reference_document: string = null;
  quantity_total: any = 0;
  gross_total: any = 0;
  discount_total: any = 0;
  tax_total: any = 0;
  neto_total: any = 0;
  internal_note: string = '';
  client_note: string = '';
}

@IonicPage()
@Component({
  selector: 'page-addordersale',
  templateUrl: 'addordersale.html',
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
export class AddordersalePage {

  footer_document: FooterDocument = new FooterDocument();
  document: Document = new Document();
  header_project: HeaderProject = new HeaderProject();

  id_user: any; //id user
  clients: any[] = [];
  session_org: any;
  id: any;
  client: any = {};
  product: Array<any>=[];
  business_name: any = '';
  cif: any = '';
  documents: any;

  currencies: any;
  taxes: any;
  warehouses: any;
  products: any;

  valid_from: string = '';
  valid_until: string = '';

  cur: any;
  tax: any;
  lis: any;
  war: any;

  c: any;

  list_product: Array<any>=[];
  quantity_product: Array<any>=[];
  price_lists: any;
  array_taxes: Array<any> = [];

  post_order: any;

  signatureImage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public http: HttpClient,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              public viewCtrl: ViewController) {

  this.session_org=sessionStorage.getItem('organization_id');
  this.id_user = sessionStorage.getItem('user');
  }

  ionViewDidLoad() {
    this.getResource();
    // console.log(this.myForm.value);
    console.log('console',this.client);
  }

  getResource(){
    return this.http.get(constants.apitype_document,
      { headers: new HttpHeaders()
        .set('authorization', sessionStorage.getItem('dns'))
        .append('app', 'BananaApp')
        .append('organization', sessionStorage.getItem('organization_id') )
        .append('user', sessionStorage.getItem('user'))
        .append('Access-Control-Allow-Origin', '*')
        .append('token', sessionStorage.getItem('token'))
      }).subscribe ( data=> {
        this.documents = data;
        this.currencies = data['currencies'];
        this.taxes = data['taxes'];
        this.warehouses = data['warehouses'];
        this.price_lists = data['price_lists'];
        // console.log('documents',this.documents);
      }, error => {
        console.log(error);
      });
  }

  openModalThirds(){
    const myModal = this.modalCtrl.create('ModalthirdsPage');
    myModal.present();

    myModal.onDidDismiss((data)=>{
      this.client= data;
      this.c = this.client['id'];
      console.log(this.client); 
      console.log(this.c);
    })
  } 

  selectC(c){
    this.cur = c;
    console.log (this.cur);
  }
  
  selectT(t){
    this.tax = t;
    console.log ('taxe:',this.tax['rate']);
    console.log ('taxe:',this.tax);
  }

  selectL(l){
    this.lis = l;
  }
  
  selectW(w){
    this.war = w;
  }
    
  openModalProducts(){
    const myModalP = this.modalCtrl.create('ModalproductsPage', {lis: this.lis, tax: this.tax, war: this.war, product: this.product});
    myModalP.present();

    myModalP.onDidDismiss((data)=>{
      // console.log(data);    //productos seleccionados desde el modal  
      if (data != null) {
        let clone: Array<any> = [];
        let gross_total: number = 0;
        for (let d of data){
          let product_prepare = this.prepareProduct(d);
          gross_total += product_prepare.net_price;
          clone.push(product_prepare);
        }
        this.product = clone;
        this.calculateGrossTaxes();
      }
      console.log('this.product',this.product);
    })
  }

  listProducts(){ 
    if( this.lis != undefined && this.war != undefined && this.tax != undefined ){
        this.openModalProducts();
    }else if( this.lis == undefined || this.war == undefined || this.tax == undefined ){
      this.translateService.get('AlertaAddOrderSaleP').subscribe( 
        value=>{
          let message = value['MensajeToast'];
          let toast = this.toastCtrl.create({
            message : message,
            duration: 3000
          });
          toast.present();
        });
      // const toast = this.toastCtrl.create({
      //   message: 'Seleccionar lista de precio, el impuesto y el almacen',
      //   duration: 3000
      // });
      // toast.present();
    }
  }

  prepareProduct (price:any) {
    const before_tax = price.beforetax;
    const net_price = parseFloat(price.netprice);
    const quantity = parseFloat(price.quantity);
    let final_price = ( !this.client.is_tax_exempt ) ? before_tax : net_price;
    let product = new BodyDocument();
    // Se prepara el renglon a insertar en el pedido
    product.reference = price.reference;
    product.name = price.name;
    product.product_detail_id = price.product_detail_id;
    product.price = final_price;
    product.quantity = quantity;
    product.net_price = final_price * quantity;
    product.dimensions = quantity;
    product.tax_id = price.tax_id;

    return product;
  }

  
  calculateGrossTaxes () {
    let me = this;
    let group_tax: any = {};
    let taxes: Array<any> = [];
    let tax_total: any = 0;
    let gross: any = 0;
    this.product.forEach(function (element){

      // cambio 
      element.net_price = element.price * element.quantity;
      // cambio 

      gross += element.net_price;
      if (element.tax_id != null) {
        let property_name = me.getElementOfList(me.taxes, element.tax_id).rate;
        if ( group_tax.hasOwnProperty(property_name) )
        group_tax[property_name] += element.net_price;
        else
          group_tax[property_name] = element.net_price;
        }
      });
      Object.keys( group_tax ).forEach(function (key:any){
        let current_tax: any = {};
        current_tax.tax = key;
        current_tax.gross = group_tax[key];
        current_tax.total = (( current_tax.gross / 100 ) * current_tax.tax);
      tax_total += current_tax.total;
      taxes.push(current_tax);
    });
    this.footer_document.gross_total = gross;
    this.footer_document.tax_total = tax_total;
    this.array_taxes = taxes;   
    this.calculateTotalNeto();
    console.log('impuesto total', this.footer_document.tax_total, 'arreglo de tax', this.array_taxes);
    
  }
  
  calculateTotalNeto () {
    this.footer_document.neto_total = (
      parseFloat(this.footer_document.gross_total)
      +
      parseFloat(this.footer_document.tax_total)
    );
  }
    
  getElementOfList(data, id) : any{
    let result: any = null;
    for (let j = 0; j < data.length; j++) {
      if(id == data[j].id){
        result = data[j];
        break;
      }
    }
    return result;
  }
    
  postBorrador(){

    if( this.lis != undefined && this.war != undefined && this.tax != undefined ){
      let body: any = {};
      this.header_project.organization_id = this.session_org;
      this.header_project.bpartner_id = this.c;
      body.header_project = this.header_project;
  
      this.document.sale_represent_id = 1535;
      this.document.bpartner_id = this.client['id'];
      this.document.address = this.client['address'];
      this.document.warehouse_id = this.war['id'];
      this.document.price_list_id = this.lis['id'];
      this.document.currency_document = this.cur['id'];
      this.document.valid_from = this.valid_from;
      this.document.valid_until = this.valid_until;
      this.document.rate = this.tax['rate'];
      this.document.status_id = 0;
      body.document = this.document;
      body.body_documents = this.product;
      body.footer_document = this.footer_document;
      body.discounts_footer = [];
      body.grouped_taxes = this.array_taxes;
      body.type_document_id = '2';
      console.log('peticioon',body);
  
      this.http.post(constants.apipostordersale,
        body,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
        }).subscribe ( data=> {
          this.post_order = data;
          const toast = this.toastCtrl.create({
            message: 'Pedido guardado exitosamente.',
            duration: 3000
          });
          toast.present();
        }, error => {
          this.translateService.get('AlertaAddOrderSale').subscribe( 
            value=>{
              let message = value['MensajeToast'];
      
              const toast = this.toastCtrl.create({
                message : message,
                duration: 3000
              });
            toast.present();
          });
        console.log(error);
      });
    }else if( this.lis == undefined || this.war == undefined || this.tax == undefined ){
      this.translateService.get('AlertaAddOrderSale').subscribe( 
        value=>{
          let message = value['MensajeToast'];
  
          const toast = this.toastCtrl.create({
            message : message,
            duration: 3000
          });
        toast.present();
      });
    }

  }

  postEnviar(){
    if( this.lis != undefined && this.war != undefined && this.tax != undefined ){
      let body: any = {};
      this.header_project.organization_id = this.session_org;
      this.header_project.bpartner_id = this.c;
      body.header_project = this.header_project;
      this.document.sale_represent_id = 1535;
      this.document.bpartner_id = this.client['id'];
      this.document.address = this.client['address'];
      this.document.warehouse_id = this.war['id'];
      this.document.price_list_id = this.lis['id'];
      this.document.currency_document = this.cur['id'];
      this.document.valid_from = this.valid_from;
      this.document.valid_until = this.valid_until;
      this.document.rate = this.tax['rate'];
      this.document.status_id = 1;
      body.document = this.document;
      body.body_documents = this.product;
      body.footer_document = this.footer_document;
      body.discounts_footer = [];
      body.grouped_taxes = this.array_taxes;
      body.type_document_id = '2';
      console.log('peticioon',body);
  
      this.http.post(constants.apipostordersale,
        body,
        { headers: new HttpHeaders()
          .set('authorization', sessionStorage.getItem('dns'))
          .append('app', 'BananaApp')
          .append('organization', sessionStorage.getItem('organization_id') )
          .append('user', sessionStorage.getItem('user'))
          .append('Access-Control-Allow-Origin', '*')
          .append('token', sessionStorage.getItem('token'))
        }).subscribe ( data=> {
          this.post_order = data;
          const toast = this.toastCtrl.create({
            message: 'Pedido enviado exitosamente.',
            duration: 3000
          });
          toast.present();
        }, error => {
          this.translateService.get('AlertaAddOrderSale').subscribe( 
            value=>{
              let message = value['MensajeToast'];
      
              const toast = this.toastCtrl.create({
                message : message,
                duration: 3000
              });
            toast.present();
          });
        console.log(error);
      });
    }else if( this.lis == undefined || this.war == undefined || this.tax == undefined ){
      this.translateService.get('AlertaAddOrderSale').subscribe( 
        value=>{
          let message = value['MensajeToast'];
  
          const toast = this.toastCtrl.create({
            message : message,
            duration: 3000
          });
          toast.present();
        });

      // const toast = this.toastCtrl.create({
      //   message: 'Debe rellenar todos los campos antes de emitir el pedido',
      //   duration: 3000
      // });
      // toast.present();
    }
  }

  agregarFirma(){
    const myModal = this.modalCtrl.create('ModalsignaturePage');
    myModal.present();

    myModal.onDidDismiss((data)=>{
      this.signatureImage= data['signatureImage'];
      console.log('signature ADDORDERSAKE',this.signatureImage);
    })
  }

  seeProduct(p,i){
    console.log('productoaddordersale',p);
    console.log('indice arreglo', i);
    this.translateService.get('AlertaAddOrderSale2').subscribe( 
			value=>{
				let ref = value['MensajeAlerta'];
				// let message = value['botonMensaje'];
        let input = value['Input'];
        let buttonCancel = value['BotonCancelar'];
        let buttonGuardar = value['BotonGuardar'];
        
      const alert4 = this.alertCtrl.create({
        title: p.name,
        subTitle: p.description_product,
        message: ref+''+ p.reference,
        inputs: [
          {
            name: 'quantity',
            placeholder: input,
            type: 'number',
            value: p.quantity
          },
        ],
        buttons: [
          {
            text: buttonCancel,
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: buttonGuardar,
            handler: data => {
              p.quantity = data.quantity;
              console.log(p);
              this.product;
              console.log('product', this.product);
              this.calculateGrossTaxes();
              // console.log(this.product);
            }
          }
        ]
      });
      alert4.present();
		});
  }

  eliminarProduct(p,i){
    let removed;
    removed = this.product.splice(i, 1);
    console.log("arreglo removido", this.product);
    this.calculateGrossTaxes();
      
  }
}
      