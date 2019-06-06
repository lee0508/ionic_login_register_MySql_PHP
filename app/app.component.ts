import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Storage } from '@ionic/Storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
//import { isRightSide } from 'ionic-angular/umd/util/util';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any;

  constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, public storage: Storage, public toastCtrl: ToastController) {
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('session_storage').then((res) =>{
      if(res == null){
        this.rootPage = LoginPage;
      }else {
        this.rootPage = HomePage;
      }
    });

  }

}

