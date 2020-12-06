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
  public tecnologia:Tecnologia;
  public mitoken:any;

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
  }

  ngOnInit() {
    this.mitoken = JSON.parse( localStorage.getItem('admin'));

    this.listaTecnologias();
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

  //ELIMINAR UNA TECNOLOGIA
  borrar(idTec){
    if(confirm("¿ La imagen se borrara,desea proseguir ?")){
      this._serviceTecnologia.eliminarTecnologia(idTec,this.mitoken['token']).subscribe(
        response=>{
          console.log(response);
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

}
