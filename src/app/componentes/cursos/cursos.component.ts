import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../services/curso.service';

import { Curso } from '../../modelos/curso';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  providers:[CursoService]
})
export class CursosComponent implements OnInit {

  public cursos = [];
  public modelo:Curso;
  public fileUpload:any;

  constructor(
    private _serviceCurso:CursoService
  ) { 
    this.modelo = new Curso(1,'','','','',1);
  }

  ngOnInit() {
    this.getCursos();
  }

  //METODO QUE OBTIENE TODOS LOS CURSOS
  getCursos(){
    this._serviceCurso.obtener_cursos().subscribe(
      response=>{
        this.cursos = response['cursos'];
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  fileChangeEvent(fileInput:any){
    this.fileUpload = <Array<File>>fileInput.target.files;
  }

  //AGREGAR UN NUEVO CURSO 
  agregarCurso(form){
    if( this.fileUpload && this.fileUpload.length > 0){
      this._serviceCurso.addCurso(this.modelo,this.fileUpload).subscribe(
        response=>{
          form.reset();
          this.getCursos();
        },
        error=>{
          console.log(<any>error);
        }
      );
    }else{
      alert("Es necesario que selecciones un archivo de tipo imagen");
    }
  }

  //ELIMINAR EL REGISTRO DE UN CURSO
  eliminar_curso(id_curso,ruta_img){
    this._serviceCurso.eliminar_curso(id_curso,ruta_img).subscribe(
      response=>{
        this.getCursos();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
