import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TecnologiaService } from '../../services/tecnologia.service';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';

import {Tecnologia} from '../../modelos/tecnologia';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.component.html',
  styleUrls:['./tecnologia.component.css'],
  providers:[TecnologiaService,UsuarioService]
})
export class TecnologiaComponent implements OnInit {
  public tecnologias:any;
  public getTecnologia:any;
  public tipos_tecnologia:any;
  public fileToUpload:any;
  public tecnologia:Tecnologia;
  public mitoken:any;
  public msj_error:boolean;

  public datos = {
    'id':1,
    'nombre'  : '',
    'descrip' : ''
  }

  constructor(
    private _serviceTecnologia:TecnologiaService,
    public _serviceUsuario:UsuarioService,
    private _route:ActivatedRoute,
    private _router:Router,
    private cd: ChangeDetectorRef
  ) { 
    //INSTANCIIA EL MODELO
    this.tecnologia = new Tecnologia(1,'','','','',1);
    this.msj_error = false
  }

  ngOnInit() {
    this.mitoken = JSON.parse( localStorage.getItem('admin'));

    this.listaTecnologias();
    this.getAllTipos();
    this.cd.detectChanges();
  }
  

  

  //MUESTRA LISTADO DE TECNOLOGIAS
  listaTecnologias(){
    this._serviceTecnologia.listadoTec().subscribe(
      response=>{
        if(response['ok']){
          this.tecnologias = response['tecnologias'];
        }else{
          this.tecnologias = [];
          console.log(response['message']);
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  //LISTADO DE TIPOS DE TECNOLOGIA
  getAllTipos(){
    this._serviceTecnologia.allTipos().subscribe(
      response=>{
        this.tipos_tecnologia = response['tipos'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //ELIMINAR UNA TECNOLOGIA
  borrar(idTec){
    if(confirm("¿ La imagen se borrara,desea proseguir ?")){
      this._serviceTecnologia.eliminarTecnologia(idTec,this.mitoken['token']).subscribe(
        response=>{
          if(response['ok']){
            this.listaTecnologias();
            this._router.navigate(['/tecnologia']);
          }else{
            alert(response['message']);
          }
        },
        error=>{
          console.log(error);
        }
      )

    }
  }
  //EDITAR UNA TECNOLOGIA
  editar(idTec){
    this._serviceTecnologia.getTecnologia(idTec).subscribe(
      response=>{
        if(response['ok']){
          this.getTecnologia = response['tecnologia'];
          this.datos.nombre = this.getTecnologia['tec_nombre'];
          this.datos.descrip = this.getTecnologia['tec_descripcion'];
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  //Metodo para agregar nueva tecnologia
  agregarTecnologia(form){
    if(this.fileToUpload && this.fileToUpload.length > 0){
        console.log(this.tecnologia);
          this._serviceTecnologia.addTecnologia(this.tecnologia).subscribe(
            respuesta=>{
              console.log(respuesta);
              if(respuesta['ok']){
                this.listaTecnologias();
              }else{
                this.msj_error = respuesta['message'];
                form.reset();
              }
            },
            error=>{
              alert("Upss!! algo anda mal");
              console.log(<any>error);
            }
          )
    }

  }

  //GUARDAR CAMBIOS
  guardarCambios(idTec){
    this.datos.id = idTec;
    this._serviceTecnologia.editartecnologia(this.datos).subscribe(
      response=>{
        alert(response['message']);
        this.listaTecnologias();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  fileChangeEvent(fileInput:any){
    this.fileToUpload =<Array<File>>fileInput.target.files;
    this._serviceTecnologia.subirImage(this.fileToUpload).subscribe(
      response=>{
        this.tecnologia.imagen = response['nombreimg'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  changeImage(fileInput:any,imagen,id){
    this.fileToUpload =<Array<File>>fileInput.target.files;
    this._serviceTecnologia.changeImg(this.fileToUpload,imagen,id).subscribe(
      response=>{
        console.log(response);
        this.listaTecnologias();
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
}
