import { Component } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts  = {
    allowSlidePrev: false,
    allowSlideNext: false
  };

  constructor(private barcodeScanner: BarcodeScanner,
              private dataLocal: DataLocalService) {}



    ionViewDidEnter(){
      console.log("ionViewDidEnter");
      this.scan();
    }
    
    ionViewDidLeave(){
      //console.log("ionViewDidLeave");
    }

    ionViewWillEnter(){
      //console.log("ionViewWillEnter");
    }

    ionViewWillLeave(){
      //console.log("ionViewWillLeave");
    }


    scan() {
      this.barcodeScanner.scan().then(barcodeData => {
        console.log('Barcode data', barcodeData);

        if (!barcodeData.cancelled) {
          this.dataLocal.guardarRegistro(barcodeData.format, barcodeData.text);
        }

       }).catch(err => {
           //console.log('Error', err);
           //this.dataLocal.guardarRegistro('QRCode', 'http://www.google.com');
          //this.dataLocal.guardarRegistro('QRCode', 'geo:40.73151796986687,-74.06087294062502');    
       });
    }
   

}
