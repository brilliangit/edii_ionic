import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  dataPegawai: Array<any> = [];
  constructor(private storage: Storage) {

  }

  ngOnInit() {
    let lala = [];
    for (let index = 0; index < 100; index++) {
      let data = {
        nama: 'Brillian Andrie' + index,
        nik: '3432543654654365436534'+index,
        jenisKelamin: 'L',
        tglLahir: '23 maret 1991'
      }
      lala.push(data);
    }
    // this.dataPegawai = lala
    this.storage.set('data_pegawai', JSON.stringify(lala));

    this.storage.get('data_pegawai').then((val) => {
      // console.log('Your age is', JSON.parse(val));
      this.dataPegawai.push(JSON.parse(val))
    });

  }
  
  show(){
    console.log(this.dataPegawai)
  }
}
