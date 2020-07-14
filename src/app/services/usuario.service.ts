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
        let params = JSON.stringify({usuario:usuario,pass:password});
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'login',params,{headers:headers});
    }

    //CREAR UN NUEVO USUARIO
    nuevoUsuario(datos:any){
        let params = JSON.stringify({datos:datos});
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'nuevousuario',params,{headers:headers}); 
    }
    
}