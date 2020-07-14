import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable} from 'rxjs';

import { GLOBAL } from './global';
import { Proyecto } from '../modelos/proyecto';

@Injectable()
export class ProyectoService{
    public url:string;

    constructor(private _http:HttpClient){
        this.url = GLOBAL.url;
    }

    //SERVICIO PARA AGREGAR UN NUEVO PROYECTO
    addProyecto(datos:Proyecto){
        let params = JSON.stringify(datos);
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.post(this.url + 'addProyecto',params,{headers:headers});
    }

    addIMG(imagen:Array<File>,idproyecto){
        const formData = new FormData();

        for(var i= 0; i < imagen.length; i++){
            formData.append('imagen',imagen[i],imagen[i].name);
        }

        formData.append('id',idproyecto);

        return this._http.post(this.url + 'subeIMG',formData);

    }
    //SERVICIO QUE ONTIENE TODOS LOS PROYECTOS
    getProyectos(){
        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getProyectos',{headers:headers});
    }

    imagenesPorProyecto(idproyecto){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getImagenes/'+idproyecto+'',{headers:headers});
    }

    getProyecto(id){
        let headers = new HttpHeaders();
        headers=headers.set('Content-Type','application/json');

        return this._http.get(this.url + 'getproyecto/'+id+'',{headers:headers});
    }

    editProyecto(datos:Proyecto){

        let params = JSON.stringify({proyecto:datos});
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.put(this.url + 'editarproyecto',params,{headers:headers});
    }

    borrrarProyecto(idProyecto){
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type','application/json');

        return this._http.put(this.url + 'borrarproyecto/'+idProyecto+'',{headers:headers});
    }

    //Servicio para subir imagen y agregar una nueva tenologia
    fileRequest(url:string,params:Array<string>,files:Array<File>){
        //Regresa una promesa
        return new Promise((resolve,reject)=>{

            var formData:any=new FormData();
            var xhr = new XMLHttpRequest();
            //Recorre cada uno de lo archivos
            for(var i = 0; i < files.length; i++){
                formData.append('imgs[]',files[i],files[i].name);
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