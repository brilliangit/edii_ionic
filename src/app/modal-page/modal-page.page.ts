import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {
  formData = {
    nama: '',
    nik: '',
    tglLahir: '',
    jenisKelamin: '',
  }
  
  constructor(private storage: Storage,private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  store(){
    this.storage.get('data_pegawai').then((val) => {
      let temp = JSON.parse(val) ? JSON.parse(val) : [];
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
