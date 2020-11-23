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
  modal = null;
  constructor(private storage: Storage, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.getData();
  }

  async presentModal() {
    this.modal = await this.modalCtrl.create({
      component: ModalPagePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop()
    });
    this.modal.onDidDismiss()
      .then(({ data }) => {
        if (data.dismissed && data.data) {
          this.dataPegawai = data.data;
        }
      });
    await this.modal.present();
  }

  async show() {
    this.presentModal();
  }

  getData() {
    this.storage.get('data_pegawai').then((val) => {
      this.dataPegawai = JSON.parse(val)
    });
  }
}
