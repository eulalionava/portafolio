import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

import { GLOBAL } from './global';
import { Experiencia } from '../modelos/experiencia';

@Injectable()
export class ExperienciaService{
    public url:string;

    constructor(private _http:HttpClient){
        this.url = GLOBAL.url;
    }

    //Servicio que obtiene los registros de experiencia
    getExperiencia(){

        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getExperiencias',{headers:headers})
        .pipe(map(res=>res));
        
    }

    getExpPorId(idexp){
        let json = JSON.stringify({idexp:idexp});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'getExpID',params,{headers:headers}).pipe(map(res=>res));

    }

    editExperience(expeciencia:Experiencia){
        let json = JSON.stringify({expe:expeciencia});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'guardarCambios',params,{headers:headers}).pipe(map(res=>res));
    }

    addExperiencia(experiencia:Experiencia){
        let params  = JSON.stringify({exp:experiencia});

        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'addexperiencia',params,{headers:headers});
    }
}