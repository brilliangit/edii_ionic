import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  dataPegawai: Array<any> = [];
  modal = null;
  constructor(public actionSheetController: ActionSheetController, private storage: Storage, private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.getData();
  }

  async presentModal(item) {
    console.log('item', item)
    this.modal = await this.modalCtrl.create({
      component: ModalPagePage,
      cssClass: 'my-custom-class',
      swipeToClose: true,
      presentingElement: await this.modalCtrl.getTop(),
      componentProps: item
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
    this.presentModal({});
  }

  getData() {
    this.storage.get('data_pegawai').then((val) => {
      this.dataPegawai = JSON.parse(val)
    });
  }

  async presentActionSheet(item) {
    const actionSheet = await this.actionSheetController.create({
      header: item.nama,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteHandler(item.id);
        }
      }, {
        text: 'Edit',
        icon: 'pencil',
        handler: () => {
          this.presentModal(item);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {

        }
      }]
    });
    await actionSheet.present();
  }

  deleteHandler(id: any) {
    this.storage.get('data_pegawai').then((val) => {
      const data = JSON.parse(val)
      const dataRemove = data.filter(function (obj: any) {
        return obj.id !== id;
      });
      this.storage.set('data_pegawai', JSON.stringify(dataRemove));
      this.dataPegawai = dataRemove;
    });
  }
}
