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
        let json = JSON.stringify(datos);
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'addProyecto',params,{headers:headers})
        .pipe(map(res=>res));
    }

    addIMG(imagen,idproyecto){
        let json = JSON.stringify({imagen:imagen,id:idproyecto});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'addImagenes',params,{headers:headers})
        .pipe(map(res=>res));

    }
    //SERVICIO QUE ONTIENE TODOS LOS PROYECTOS
    getProyectos(){
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.get(this.url + 'getProyectos',{headers:headers})
        .pipe(map(res=>res));
    }

    imagenesPorProyecto(idproyecto){
        let json = JSON.stringify({proyecto:idproyecto});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'getImagenes',params,{headers:headers})
        .pipe(map(res=>res));
    }

    getProyecto(id){
        let json = JSON.stringify({proyecto:id});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'getproyecto',params,{headers:headers})
        .pipe(map(res=>res));
    }

    editProyecto(datos:Proyecto){

        let json = JSON.stringify({proyecto:datos});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'editarproyecto',params,{headers:headers})
        .pipe(map(res=>res));
    }

    borrrarProyecto(idProyecto){
        let json = JSON.stringify({proyecto:idProyecto});
        let params = 'json='+json;
        let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

        return this._http.post(this.url + 'borrarproyecto',params,{headers:headers})
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