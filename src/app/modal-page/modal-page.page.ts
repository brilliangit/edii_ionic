import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  formData = {
    id: null,
    nama: '',
    nik: '',
    tglLahir: '',
    jenisKelamin: '',
  }

  constructor(public navParams: NavParams, private storage: Storage, private modalCtrl: ModalController) {
    this.formData = {
      id: this.navParams.get('id'),
      nama: this.navParams.get('nama'),
      nik: this.navParams.get('nik'),
      tglLahir: this.navParams.get('tglLahir'),
      jenisKelamin: this.navParams.get('jenisKelamin'),
    }
  }

  ngOnInit() {
  }

  store() {
    this.storage.get('data_pegawai').then((val) => {
      let temp = JSON.parse(val) ? JSON.parse(val) : [];
      if (this.formData.id){
        const idUpdate = this.formData.id
        temp = temp.filter(function (obj: any) {
          return obj.id !== idUpdate
        });
      }else{
        let id = 1;
        if (temp.length > 0) {
          id = Math.max.apply(Math, temp.map(function (o) { return o.id })) + 1;
        }
        this.formData.id = id;
      }
      temp.push(this.formData);
      this.storage.set('data_pegawai', JSON.stringify(temp));
      setTimeout(() => {
        this.dismiss(temp)
      }, 300);
    });
  }

  dismiss(data) {
    this.modalCtrl.dismiss({
      'dismissed': true,
      'data': data
    });
  }

}
