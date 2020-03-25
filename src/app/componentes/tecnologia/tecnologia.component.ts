import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { TecnologiaService } from '../../services/tecnologia.service';
import { UsuarioService } from '../../services/usuario.service';
import { ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';

import {Tecnologia} from '../../modelos/tecnologia';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.component.html',
  styleUrls: ['./tecnologia.component.css'],
  providers:[TecnologiaService,UsuarioService]
})
export class TecnologiaComponent implements OnInit {
  public tecnologias:any;
  public getTecnologia:any;
  public tecnologia:Tecnologia;

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
    this.tecnologia = new Tecnologia(1,'','','','','');
  }

  ngOnInit() {
    this.listaTecnologias();
    this.cd.detectChanges();
  }
  

  

  //MUESTRA LISTADO DE TECNOLOGIAS
  listaTecnologias(){
    this._serviceTecnologia.listadoTec().subscribe(
      response=>{
        if(response['code'] == 200){
          this.tecnologias = response['data'];
        }else{
          this.tecnologias = [];
        }
      },
      error=>{
        console.log(error);
      }
    )
  }

  //ELIMINAR UNA TECNOLOGIA
  borrar(idTec){
    this._serviceTecnologia.eliminarTecnologia(idTec).subscribe(
      response=>{
        if(response['code'] == 200){
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
  //EDITAR UNA TECNOLOGIA
  editar(idTec){
    this._serviceTecnologia.getTecnologia(idTec).subscribe(
      response=>{
        if(response['code'] == 200){
          this.getTecnologia = response['data'][0];
          this.datos.nombre = this.getTecnologia['tec_nombre'];
          this.datos.descrip = this.getTecnologia['tec_descripcion'];
          console.log(this.getTecnologia);
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
        console.log(response);
        this._router.navigate(['/tecnologia']);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
