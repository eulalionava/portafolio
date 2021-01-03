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
        console.log(response);
        this.cursos = response['cursos'];
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
