import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataPegawai: Array<any> = [];
  constructor(private storage: Storage, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    // let lala = [];
    // for (let index = 0; index < 100; index++) {
    //   let data = {
    //     nama: 'Brillian Andrie' + index,
    //     nik: '3432543654654365436534'+index,
    //     jenisKelamin: 'L',
    //     tglLahir: '23 maret 1991'
    //   }
    //   lala.push(data);
    // }
    // this.storage.set('data_pegawai', JSON.stringify(lala));

    this.storage.get('data_pegawai').then((val) => {
      this.dataPegawai = JSON.parse(val)
    });

  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPagePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop() // Get the top-most ion-modal
    });
    return await modal.present();
  }

  show() {
    // let lala = [];
    // let data = {
    //   nama: 'Brillian Andrie',
    //   nik: '3432543654654365436534',
    //   jenisKelamin: 'L',
    //   tglLahir: '23 maret 1991'
    // }
    // this.storage.get('data_pegawai').then((val) => {
    //   this.dataPegawai = JSON.parse(val)
    // });
    // this.dataPegawai.push(data);
    // this.storage.set('data_pegawai', JSON.stringify(this.dataPegawai));
    this.presentModal();
  }
}
