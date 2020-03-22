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

    addTecnologia(tecnologia:Tecnologia){
        let json = JSON.stringify(tecnologia);
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
         
        return this._http.post(this.url + 'addtecnologias',params,{headers:headers})
        .pipe(map(res=>res));
    }

    //SEVICIO QUE OBTIENE UN LISTADO DE TODAS LAS TECNOLOGIAS
    listadoTec(){
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
        return this._http.get(this.url + 'listado-tecnologia',{headers:headers})
        .pipe(map(res=>res));
    }

    //SERVICIO QUE ELIMINA UN REGISTRO
    eliminarTecnologia(idTecnologia){
        let json = JSON.stringify({id:idTecnologia});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'cancelar-tecnologia',params,{headers:headers})
        .pipe(map(res=>res));
    }

    //OBTIENE UNA TECNOLOGIA
    getTecnologia(idTecnologia){
        let json = JSON.stringify({id:idTecnologia});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'getTecnologia',params,{headers:headers})
        .pipe(map(res=>res));
    }

    //SERVICIO QUE EDITAR UNA TECNOLOGIA
    editartecnologia(datosTec){
        let json = JSON.stringify({datos:datosTec});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'editarTecnologia',params,{headers:headers})
        .pipe(map(res=>res));

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