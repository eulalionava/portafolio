import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute } from '@angular/router';
import { Proyecto } from '../../modelos/proyecto';

import { ProyectoService } from  '../../services/proyecto.service';
import { TecnologiaService } from '../../services/tecnologia.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css'],
  providers:[ProyectoService,TecnologiaService]
})
export class EditarProyectoComponent implements OnInit {
  public proyecto_id;
  public proyecto = [];
  public lista_tecnologias =[];

  public modelo:Proyecto;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _serviceProyecto:ProyectoService,
    private _serviceTecnologia:TecnologiaService
  ) { 
    this.modelo = new Proyecto(1,'','','',1,'',1); 
  }

  ngOnInit() {
    this.proyecto_id = parseInt( this._route.snapshot.paramMap.get('id'));

    this.getProyectoPorId();
  }

  getProyectoPorId(){
    this._serviceProyecto.getProyecto(this.proyecto_id).subscribe(
      response=>{
        this.proyecto = response['proyecto'];
        this.modelo.id          = this.proyecto_id;
        this.modelo.nombre      = this.proyecto['pro_nombre'];
        this.modelo.descripcion =  this.proyecto['pro_descripcion'];


        let tecnologias = this.proyecto['pro_tecnologias'].split(',');

        tecnologias.forEach(item => {
          if(item != ""){
            this._serviceTecnologia.getTecnologia(item).subscribe(
              res=>{
                this.lista_tecnologias.push(res['tecnologia']);
              },
              err=>{
                console.log(<any>err);
              }
            );
          }
        });

      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  guardar_cambios(){
    console.log("bien");
    this._serviceProyecto.editProyecto(this.modelo).subscribe(
      response=>{
        this._router.navigate(['/proyectos']);

      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
