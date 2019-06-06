import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  anggota: any;
  full_name: string;
  phone_number: string;
  username: string;
  userpasswd: string;

  today = Date.now();

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private postPvdr: PostProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    
    this.storage.get('session_storage').then((res) =>{
      this.anggota = res;
      this.full_name = this.anggota.full_name;
      this.phone_number = this.anggota.phone_number;
      this.username = this.anggota.username;
      this.userpasswd = this.anggota.userpasswd;

      //this.load(); 
    });
  }

 
  selectText(event): void{
    event.target.select();
  } 

  saveChange() {
    let body = {
      full_name: this.full_name,
      phone_number: this.phone_number,
      username: this.username,
      userpasswd: this.userpasswd,
      user_id: this.anggota.user_id,
      aksi: 'update_profile'
    };

    this.postPvdr.postData(body, 'file_aksi.php').subscribe((data) =>{
      //console.log(data.msg);
      //var alertpesan = data.msg;
      //if(data.success){
        //this.navCtrl.pop();
        //this.storage.set('session_storage', data.result);
        //this.navCtrl.setRoot(HomePage); // this here i'm going Home..
        this.anggota.full_name = this.full_name;
        this.anggota.phone_number = this.phone_number;
        this.storage.set('session_storage', this.anggota);
        this.navCtrl.pop();
        let toast = this.toastCtrl.create({
          message: "upate successful",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      //  console.log(data);
      //}else{
        // let toast = this.toastCtrl.create({
        //   message: alertpesan,
        //   duration: 3000,
        //   position: 'bottom'
        // });
        // toast.present();
      //}
    });

   /*  this.storage.set('session_storage', this.anggota);
    this.navCtrl.pop()
    let toast = this.toastCtrl.create({
      message: 'Here...',
      duration: 3000,
      position: 'bottom'
    });    
    
    toast.present(); */

  }

}
