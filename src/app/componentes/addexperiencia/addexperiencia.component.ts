import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../modelos/experiencia';

@Component({
  selector: 'app-addexperiencia',
  templateUrl: './addexperiencia.component.html',
  providers:[ExperienciaService]
})
export class AddexperienciaComponent implements OnInit {
  public exp:Experiencia;

  constructor(
    private _servicexperiencia:ExperienciaService,
    private _router:Router
  ) {
    this.exp = new Experiencia(1,'','','','','','','','','',0,1);
   }

  ngOnInit() {
  }

  agregarexperiencia(){
    this._servicexperiencia.addExperiencia(this.exp).subscribe(
      response=>{
        if(response['ok']){
          this._router.navigate(['/experiencia']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
