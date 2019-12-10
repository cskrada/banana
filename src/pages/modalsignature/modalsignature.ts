import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';


@IonicPage()
@Component({
  selector: 'page-modalsignature',
  templateUrl: 'modalsignature.html',
})
export class ModalsignaturePage {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  public signatureImage: string;
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }
  
  public signaturePadOptions: Object = { 
    'minWidth': 1,  
    'canvasWidth': 300,
    'canvasHeight': 300
  };

  canvasResize(){
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }


  ngAfterViewInit() {
    // this.signaturePad is now available
    console.log('come here');
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.canvasResize();
  }

  drawComplete(){
    this.signatureImage = this.signaturePad.toDataURL();
    console.log('MODALFIMRA',this.signatureImage);
    this.viewCtrl.dismiss({signatureImage: this.signatureImage});
  }

  drawClear(){
    this.signaturePad.clear();
  }

  drawCancel(){
    this.viewCtrl.dismiss({signatureImage: ''});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalsignaturePage');
  }

}
