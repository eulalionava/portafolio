import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

import { GLOBAL } from './global';
import { Tecnologia } from '../modelos/tecnologia';

@Injectable()

export class TecnologiaService{
    
    public url:string;

    constructor(public _http:HttpClient){
        this.url = GLOBAL.url;
    }

    //LISTADO DE TIPOS DE TECNOLOGIA
    allTipos(){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getTipos',{headers:headers});
    }

    //SUBIR IMAGEN
    subirImage(files:Array<File>){
        const formData = new FormData();
        
        for(var i= 0; i < files.length; i++){
            formData.append('imagen',files[i],files[i].name);
        }

        return this._http.put(this.url + 'subeIMG',formData);
    }

    addTecnologia(tecnologia:Tecnologia){
        let mitoken = JSON.parse( localStorage.getItem('admin'));

        let params  = JSON.stringify({tecnologia:tecnologia});
        let headers = new HttpHeaders();

        headers     = headers.set('Content-Type','application/json');
        headers     = headers.set('token',mitoken.token);
         
        return this._http.post(this.url + 'addtecnologia',params,{headers:headers});
    }

    //SEVICIO QUE OBTIENE UN LISTADO DE TODAS LAS TECNOLOGIAS
    listadoTec(){
        let headers = new HttpHeaders();
        headers     = headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getTecnologias',{headers:headers});
    }

    //SERVICIO QUE ELIMINA UN REGISTRO
    eliminarTecnologia(idTecnologia,token){

        let headers = new HttpHeaders();
        headers     = headers.set('Content-Type','application/json');
        headers     = headers.set('token',token);

        return this._http.post(this.url + 'desactivartecnologia/'+idTecnologia+'',{headers:headers});
        
    }

    //OBTIENE UNA TECNOLOGIA
    getTecnologia(idTecnologia){
        let params = JSON.stringify({id:idTecnologia});
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'getTecnologia',params,{headers:headers});
    }

    //SERVICIO QUE EDITAR UNA TECNOLOGIA
    editartecnologia(datosTec){
        let params = JSON.stringify({datos:datosTec});
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.put(this.url + 'editarTecnologia',params,{headers:headers});

    }

    //Servicio para subir imagen y agregar una nueva tenologia
    fileRequest(url:string,params:Array<string>,files:Array<File>){
        //Regresa una promesa
        return new Promise((resolve,reject)=>{

            var formData:any=new FormData();
            var xhr = new XMLHttpRequest();
            //Recorre cada uno de lo archivos
            for(var i = 0; i < files.length; i++){
                formData.append('uploads[]',files[i],files[i].name);
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }else{
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST',url,true);
            xhr.send(formData);
        });
    }
    
    
}