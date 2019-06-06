//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map' ;
/*
  Generated class for the PostProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostProvider {
    public server: string ="http://localhost:8000/webapp/ionproject/server_api/"

  constructor(public http: Http) {
    console.log('Hello PostProvider Provider');
  }

  postData(body, file) {
      let type = "application/json; charset=UTF-8";
      let headers = new Headers({ 'Content-Type': type });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.server + file, JSON.stringify(body), options)
      .map(res => res.json());

  }

}
