import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';
import {UsuarioService} from '../../services/usuario.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-cargar-imgs',
  templateUrl: './cargar-imgs.component.html',
  styleUrls: ['./cargar-imgs.component.css'],
  providers:[ProyectoService,UsuarioService]
})
export class CargarImgsComponent implements OnInit {
  public fileToUpload;
  public resultUpload:any;
  public imagenes:any;
  public proyectos:any;
  public success:true;
  public error:true;

  public imagen:any;
  public idproyecto:any;

  constructor(
    private _serviceProyecto:ProyectoService,
    private _route:ActivatedRoute,
    private _router:Router,
    public _serviceUsuario:UsuarioService
  ) { }

  ngOnInit() {
    //ID DEL PROYECTO
    this.idproyecto = parseInt( this._route.snapshot.paramMap.get('idpro'));
    this.getImagenes();
  }

  getImagenes(){
    this._serviceProyecto.imagenesPorProyecto(this.idproyecto).subscribe(
      response=>{
        this.imagenes = response['imagenes'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //METODO QUE CARGA IMAGNES A UN PROYECTO
  agregarImgs(){
    if(this.fileToUpload && this.fileToUpload.length > 0){
          this._serviceProyecto.addIMG(this.fileToUpload,this.idproyecto).subscribe(
            respuesta=>{
              console.log(respuesta);
              if(respuesta['ok']){
                this.success = true;
                this.getImagenes();
              }else{
                this.error = true;
              }
            },
            error=>{
              alert("Upss!! error 400 el servidor no pudo interpretar la solicitud dada una sintaxis inválida.");
            }
          )
    }
  }

  

  //Detecta cambios en la imagen
  fileChangeEvent(fileInput:any){
    this.fileToUpload =<Array<File>>fileInput.target.files
  }

}
