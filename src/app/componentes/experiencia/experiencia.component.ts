import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ExperienciaService } from '../../services/experiencia.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
  providers:[ExperienciaService,UsuarioService]
})
export class ExperienciaComponent implements OnInit {
  public trabajos:any;

  constructor(
    private _serviceExpeciencia:ExperienciaService,
    public _serviceUsuario:UsuarioService,
    private _router:Router
  ){ 

  }

  ngOnInit() {
    this.experiencia();
  }

  experiencia(){
    this._serviceExpeciencia.getExperiencia().subscribe(
      response=>{
        if(response['ok']){
          this.trabajos = response['experiencias']; 
        }else{
          alert(response['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

}
