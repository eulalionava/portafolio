import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';


import {Proyecto} from '../../modelos/proyecto';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-addproyecto',
  templateUrl: './addproyecto.component.html',
  styleUrls: ['./addproyecto.component.css'],
  providers:[ProyectoService]
})
export class AddproyectoComponent implements OnInit {

  public proyecto:Proyecto;

  constructor(
    private _serviceProyecto:ProyectoService,
    private _route:ActivatedRoute,
    private _router:Router
  ){
    this.proyecto = new Proyecto(1,'','','1',1,1);
   }

  ngOnInit() {
  }

  agregarProyecto(){
    this._serviceProyecto.addProyecto(this.proyecto).subscribe(
      response=>{
        console.log(response);
        this._router.navigate(['/proyectos']);
      },
      error=>{
        console.log(error);
        alert("Upss!! error 400 el servidor no pudo interpretar la solicitud dada una sintaxis inválida.");
      }
    )
  }

}
