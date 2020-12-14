import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProyectoService } from '../../services/proyecto.service';
import { UsuarioService } from '../../services/usuario.service';
import { TecnologiaService } from "../../services/tecnologia.service";

import { Proyecto } from '../../modelos/proyecto';
import { error } from 'protractor';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
  providers:[ProyectoService,UsuarioService,TecnologiaService]
})
export class ProyectosComponent implements OnInit {
  public modelo:Proyecto;
  public getproyecto:any;
  public imagenes = [];
  public proyectos = [];
  public lista_tecnologias:any;
  public lista_checks = [];

  constructor(
    private _serviceProyecto:ProyectoService,
    public _serviceUsuario:UsuarioService,
    private _serviceTecnologia:TecnologiaService
  ) { 
    this.modelo = new Proyecto(1,'','','1',1,1);
  }

  ngOnInit() {
    this.getProyectos();
    this.getListaTecnologias();

    
  }

  //LISTADO DE TODOS LOS PROYECTOS
  getProyectos(){
    this._serviceProyecto.getProyectos().subscribe(
      response=>{
        this.proyectos = response['proyectos'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //LISTADO DE TODAS LAS TECNOLOGIAS
  getListaTecnologias(){
    this._serviceTecnologia.listadoTec().subscribe(
      response=>{
        this.lista_tecnologias = response['tecnologias'];
        console.log(this.lista_tecnologias);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  //Funcion para borrar un proyecto
  borrarproyecto(idproyecto){
    if(confirm("¿ Desea continuar ?")){
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
  }

  editarProyecto(idproyecto){
    // this._serviceProyecto.getProyecto(idproyecto).subscribe(
    //   response=>{
    //     this.getproyecto = response['proyecto'];
    //     this.modelo.id = this.getproyecto['pro_id'];
    //     this.modelo.nombre = this.getproyecto['pro_nombre'];
    //     this.modelo.descripcion = this.getproyecto['pro_descripcion']
    //     console.log(response);
    //   },
    //   error=>{
    //     console.log(<any>error);
    //   }
    // );
  }

  guardarCambios(idproyecto){
    this._serviceProyecto.editProyecto(this.modelo).subscribe(
      response=>{
        this.getProyectos();
        alert(response['message']);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  onChange(event){
    let valor = event.target.value;
    //Busca y remueve
    if(this.lista_checks.includes(valor)){
      let remover = this.lista_checks.indexOf(valor);
      this.lista_checks.splice(remover,1);

    }else{

      if(event.target.checked){
        //Agrega
        this.lista_checks.push(valor);
  
      }
    }
    let lista = "";
    
    this.lista_checks.forEach(item=>{
      lista+=item+',';
    });

    this.modelo.tecnologia = lista;

  }

  //AGREGAR UN NUEVO PROYECTO
  agregarProyecto(form){
    this._serviceProyecto.addProyecto(this.modelo).subscribe(
      response=>{
        form.clean();
        this.getProyectos();
      },
      error=>{
        console.log(error);
        alert("Upss!! error 400 el servidor no pudo interpretar la solicitud dada una sintaxis inválida.");
      }
    )
  }

  //EIMINAR UN PROYECTO
  eliminar_proyecto(id_proyecto){
    if(confirm("Desea eliminar este proyecto")){
      this._serviceProyecto.borrrarProyecto(id_proyecto).subscribe(
        response=>{
          this.getProyectos();
        },
        error=>{
          console.log(<any>error);
        }
      );
    }
  }


}
