import { Component, OnInit } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { UsuarioService } from '../../services/usuario.service';
import { Proyecto } from '../../modelos/proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers:[ProyectoService,UsuarioService]
})
export class ProyectosComponent implements OnInit {
  public modelo:Proyecto;
  public getproyecto:any;
  public imagenes = [];
  public proyectos = [];

  constructor(
    private _serviceProyecto:ProyectoService,
    public _serviceUsuario:UsuarioService
  ) { 
    this.modelo = new Proyecto(1,'','','1');
  }

  ngOnInit() {
    this.getProyectos();
  }

  getProyectos(){
    this._serviceProyecto.getProyectos().subscribe(
      response=>{
        this.imagenes = response['imagenes'];
        this.proyectos = response['data'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //Funcion para borrar un proyecto
  borrarproyecto(idproyecto){
    this._serviceProyecto.borrrarProyecto(idproyecto).subscribe(
      response=>{
        this.getProyectos();
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  editarproyecto(idproyecto){
    this._serviceProyecto.getProyecto(idproyecto).subscribe(
      response=>{

        this.getproyecto = response['data'][0];
        this.modelo.id = this.getproyecto['IDpro'];
        this.modelo.nombre = this.getproyecto['pro_nombre'];
        this.modelo.descripcion = this.getproyecto['pro_descripcion']
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  guardarCambios(idproyecto){
    this._serviceProyecto.editProyecto(this.modelo).subscribe(
      response=>{
        this.getProyectos();
        console.log(response);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
