import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

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
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.get(this.url + 'getExpID/'+idexp,{headers:headers}).pipe(map(res=>res));

    }

    editExperience(expeciencia:Experiencia){

        let params = JSON.stringify(expeciencia);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'guardarCambios',params,{headers:headers});
    }

    addExperiencia(experiencia:Experiencia){
        let params  = JSON.stringify({exp:experiencia});

        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'addexperiencia',params,{headers:headers});
    }

    eliminar_experiencia(id_experiencia){

        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.put(this.url + 'borrarExperiencia/'+id_experiencia,{headers:headers});
    }
}