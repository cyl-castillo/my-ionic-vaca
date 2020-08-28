import { Injectable } from '@angular/core';
import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  rootURL = 'https://app.vacusoftware.com/api/v1/'

  //rootURL = '192.168.1.188:8000/app.vacusoftware.com/api/v1/'

  constructor(private http: HttpClient) { }



  syncBD(endpoint,negocio){
    return new Promise((resolve, reject) => {
      this.http.get(this.rootURL + endpoint + 'list/' + negocio)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  login(usuario: string, clave: string) {

    return new Promise((resolve, reject) => {
      this.http.post(this.rootURL + 'auth/login', { "email":usuario, "password":clave })
        .subscribe(res => {
          console.log('token '+JSON.parse(JSON.stringify(res)).access_token)
          localStorage.setItem('token',JSON.parse(JSON.stringify(res)).access_token);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public uploadData(data){
    
    return new Promise((resolve, reject) => {
      this.http.post(this.rootURL + 'sincronizacion/sincronizaciones',data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public downloadData(id_negocio){
    
    return new Promise((resolve, reject) => {
      this.http.get(this.rootURL + 'sincronizacion/sincronizaciones/start/' + id_negocio)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public negocio(){
    
    return new Promise((resolve, reject) => {
      this.http.get(this.rootURL + 'negocio/negocios')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public usuario(){
    return new Promise((resolve, reject) => {
      this.http.get(this.rootURL + 'usuario/usuarios')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  public roles(){
    return new Promise((resolve, reject) => {
      this.http.get(this.rootURL + 'role/roles')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
