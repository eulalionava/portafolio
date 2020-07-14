import { Component, OnInit } from '@angular/core';
import { Tecnologia } from '../../modelos/tecnologia';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { TecnologiaService } from '../../services/tecnologia.service';
import { error } from 'protractor';

@Component({
  selector: 'app-agregar-tec',
  templateUrl: './agregar-tec.component.html',
  providers:[TecnologiaService]
})
export class AgregarTecComponent implements OnInit {
  public tecnologia:Tecnologia;
  public tiposTec:any;
  public fileToUpload;
  public resultUpload:any;
  public msjerror;

  constructor(
    private _serviceTecnologia:TecnologiaService,
    private _Route:ActivatedRoute,
    private _router:Router
  ){
    this.tecnologia = new Tecnologia(1,'','','','','S');
    this.msjerror = "";
  }

  ngOnInit() {
    this.getAllTipos();
  }

  getAllTipos(){
    this._serviceTecnologia.allTipos().subscribe(
      response=>{
        this.tiposTec = response['tipos'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Metodo para agregar nueva tecnologia
  agregarTecnologia(form){
    if(this.fileToUpload && this.fileToUpload.length > 0){
          this._serviceTecnologia.addTecnologia(this.tecnologia).subscribe(
            respuesta=>{
              if(respuesta['ok']){
                this._router.navigate(['/tecnologia']);
              }else{
                this.msjerror = respuesta['message'];
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

  //Detecta cambios en la imagen
  fileChangeEvent(fileInput:any){
    this.fileToUpload =<Array<File>>fileInput.target.files

    this._serviceTecnologia.subirImage(this.fileToUpload).subscribe(
      response=>{
        this.tecnologia.imagen = response['nombreimg'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }


}
