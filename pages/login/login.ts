import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';
import { Storage } from '@ionic/Storage';

import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string = "";
  userpasswd: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, private postPvdr: PostProvider, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    //this.username = "";
    //this.userpasswd = "";
  }

  
  
  Register(){
    this.navCtrl.push(RegisterPage);
  }

  signIn() {
    if(this.username != "" && this.userpasswd != "")
    {
      let body = {
        //full_name: this.full_name,
        //phone_number: this.phone_number,
        username: this.username,
        userpasswd: this.userpasswd,
        aksi: 'login'
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe((data) =>{
        console.log(data.msg);
        var alertpesan = data.msg;
        if(data.success){
          //this.navCtrl.pop();
          this.storage.set('session_storage', data.result);
          this.navCtrl.setRoot(HomePage); // this here i'm going Home..
          let toast = this.toastCtrl.create({
            message: "login successful",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          console.log(data);
        }else{
          let toast = this.toastCtrl.create({
            message: alertpesan,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
      });

    }else{
      let toast = this.toastCtrl.create({
        message: 'username or password invalid',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();

    }

    //this.navCtrl.push(HomePage);
  }

}
