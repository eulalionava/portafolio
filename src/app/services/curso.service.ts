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

    addCurso(curso:Curso,files:Array<File>){

        const formData = new FormData();

        for(var i=0; i < files.length; i++){
            formData.append('imagen',files[i],files[i].name);
        }
        formData.append('nombre',curso.nombre);
        formData.append('plataforma',curso.plataforma);


        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'addCurso',formData);

    }

    eliminar_curso(id_curso,ruta_img){
        let params = JSON.stringify({id:id_curso,ruta:ruta_img});
        
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','Application/json');

        return this._http.post(this.url + 'delete_curso',params,{headers:headers});
    }
}