import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
 
  private _storage: Storage | null = null;

  guardados: Registro[] = [];

  constructor(private storage: Storage, 
              private navCtrl:NavController, private iab: InAppBrowser ) {
    this.init();

    this.cargarStorage();

   }

    async cargarStorage() { 
      this.guardados = await this.storage.get('registros') || [];
    }

   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async guardarRegistro( format: string, text: string) {

    await this.cargarStorage();

    const nuevoRegistro = new Registro( format, text );
    this.guardados.unshift( nuevoRegistro );
 
    console.log(this.guardados);
    this.storage.set('registros', this.guardados);

    this.abrirRegistro( nuevoRegistro );
  }

  abrirRegistro( registro: Registro ) {
    this.navCtrl.navigateForward('/tabs/tab2'); 

    switch (registro.type) {
      case 'http':
        this.iab.create( registro.text, '_system' )
        break;
     

    }
  }

}
