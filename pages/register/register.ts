import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PostProvider } from '../../providers/post-provider';

//import { HttpModule } from '@angular/http';
//import { PostProvider } from '../providers/post-provider';
//import { IonicStorageModule } from '@ionic/Storage';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  private full_name: string = "";
  private phone_number: string = "";
  private username: string = "";
  private userpasswd: string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public postPvdr: PostProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  formLogin() {
    this.navCtrl.pop();
  }

  addRegister() {
    if(this.full_name=="")
    {      
      let toast = this.toastCtrl.create({
        message: 'please enter your full name.',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();      


    }else if(this.phone_number=="")
    {
      
      let toast = this.toastCtrl.create({
        message: 'please enter your phone number.',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();      


    }else if(this.username=="")
    {
      
      let toast = this.toastCtrl.create({
        message: 'please enter your username.',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();      


    }else if(this.userpasswd==""){
      
        let toast = this.toastCtrl.create({
          message: 'please enter your password.',
          duration: 3000,
          position: 'top'
        });
      
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
      
        toast.present();      

    }else{
      //
      let body = {
        full_name: this.full_name,
        phone_number: this.phone_number,
        username: this.username,
        userpasswd: this.userpasswd,
        aksi: 'add_register'
      };

      this.postPvdr.postData(body, 'file_aksi.php').subscribe((data) =>{
        console.log(data.msg);
        if(data.success){
          this.navCtrl.pop();
          let toast = this.toastCtrl.create({
            message: "Register successful",
            duration: 3000,
            position: 'bottom'
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
        }
        else
        {
          let toast = this.toastCtrl.create({
            message: data.msg,
            duration: 3000,
            position: 'bottom'
          });
        
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();

        }

      });
    }
  }

}
