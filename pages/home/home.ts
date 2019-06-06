import { Component } from '@angular/core';
import { NavController, NavParams, App, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';
import { LoginPage } from '../login/login';
import { SettingPage } from '../setting/setting'
//import { Storage } from '@ionic/Storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  anggota: any;
  members: any;
  user_id: any;
  //private user_id: any;
  //full_name: string;
  //username: string;
  //userpasswd: string;
  //user_id: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private postPvdr: PostProvider, public storage: Storage, private AppCtrl: App,) {
  }


  
  ionViewWillEnter() {
    this.storage.get('session_storage').then((res) =>{
      this.anggota = res;
      this.load(); 
    });    
  }

  load(){

    //console.log(this.anggota);

    let body = {
      //username: this.anggota.username,
      //userpasswd: this.anggota.userpasswd,
      user_id: this.anggota.user_id,
      aksi: 'profile' 
    };
    this.postPvdr.postData(body, 'file_aksi.php').subscribe((data) =>{
      this.members = data.profiles;      
      //this.full_name = this.members.full_name;
      //this.username = this.members.username;
      //this.user_id = this.members.user_id;

    });
  }

  //console.log("logOut");
  logOut(){
  this.storage.clear();
  this.AppCtrl.getRootNav().setRoot(LoginPage);
  let toast = this.toastCtrl.create({
    message: 'logOut success',
    duration: 3000,
    position: 'bottom'
  });    
  
  toast.present();
}

OpenSetting() {
  this.navCtrl.push(SettingPage);
}

}
