import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

import { GLOBAL } from './global';

@Injectable()
export class ExperienciaService{
    public url:string;

    constructor(private _http:HttpClient){
        this.url = GLOBAL.url;
    }

    //Servicio que obtiene los registros de experiencia
    getExperiencia(){

        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'trabajos',{headers:headers})
        .pipe(map(res=>res));
        
    }
}