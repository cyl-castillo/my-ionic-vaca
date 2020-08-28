import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { Observable, fromEvent, merge, of, BehaviorSubject } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private online: Observable<boolean> = null;
  private hasConnection = new BehaviorSubject(false);

  rootURL = 'https://app.vacusoftware.com/api/v1/'

  //rootURL = 'https://app.vacusoftware.com/index.php/api/v1/'

  constructor(private network: Network,
    private platform: Platform,
    private api: ApiService,
    private http: HttpClient) {
      if (this.platform.is('cordova')) {
        // on Device
        this.network.onConnect().subscribe(() => {
            console.log('network was connected :-)');
            this.hasConnection.next(true);
            return;
        });
        this.network.onDisconnect().subscribe(() => {
            console.log('network was disconnected :-(');
            this.hasConnection.next(false);
            return;
        });
      } else {
        // on Browser
        this.online = merge(
        of(navigator.onLine),
        fromEvent(window, 'online').pipe(mapTo(true)),
        fromEvent(window, 'offline').pipe(mapTo(false))
        );
      
        this.online.subscribe((isOnline) =>{
            if (isOnline) {
                this.hasConnection.next(true);
               console.log('network was connected :-)');
            } else {
                console.log('network was disconnected :-(');
                this.hasConnection.next(false);
                console.log(isOnline);
              }
          });
      }
      this.testNetworkConnection();
    }

    public getNetworkType(): string {
      return this.network.type;
  }

  public getNetworkStatus(): Observable<boolean> {
      return this.hasConnection.asObservable();
  }

  private getNetworkTestRequest(): Observable<any> {
      return this.http.get('https://www.google.com/');
      //return this.http.get('https://app.vacusoftware.com/api/v1/negocio/negocios');
     // return this.http.get('https://app.vacusoftware.com/index.php/api/v1/negocio/negocios'); 
  }

  public async testNetworkConnection() {
      try {
          this.getNetworkTestRequest().subscribe(
          success => {
              // console.log('Request to Google Test  success', success);
                  this.hasConnection.next(true);
              return;
          }, error => {
              // console.log('Request to Google Test fails', error);
              this.hasConnection.next(false);
              return;
          });
      } catch (err) {
          console.log('err testNetworkConnection', err);
          this.hasConnection.next(false);
          return;
     }
  }

  public networkDisconnetion(){
    this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.hasConnection.next(false);
      return;
    });
  }

}
