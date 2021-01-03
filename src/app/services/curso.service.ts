import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { GLOBAL }from './global';
import { Curso } from '../modelos/curso';

@Injectable()
export class CursoService{
    public url:string;

    constructor(private _http:HttpClient){
        this.url = GLOBAL.url;
    }

    obtener_cursos(){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getAllCursos',{headers:headers});
    }
}