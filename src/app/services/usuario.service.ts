import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

import { GLOBAL } from './global';

@Injectable()

export class UsuarioService{

    public url:string;

    constructor(public _http:HttpClient){
        this.url = GLOBAL.url;
    }

    Auth(){
        if(localStorage.getItem('admin')){
            return true;
        }else{
            return false;
        }
    }
    
    iniciarsesion(usuario,password){
        let json = JSON.stringify({usuario:usuario,pass:password});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'inicio',params,{headers:headers}).pipe(map(res=>res));
    }
    
}