import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Experiencia } from '../../modelos/experiencia';
import { ExperienciaService } from '../../services/experiencia.service';
import { UsuarioService } from '../../services/usuario.service';
import { Expression } from '@angular/compiler';
import { error } from 'protractor';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
  providers:[ExperienciaService,UsuarioService]
})
export class ExperienciaComponent implements OnInit {
  public trabajos = [];
  public modelo:Experiencia;

  constructor(
    private _serviceExpeciencia:ExperienciaService,
    public _serviceUsuario:UsuarioService,
    private _router:Router
  ){ 
    this.modelo = new Experiencia(1,'','','','','','','','','',1);
  }

  ngOnInit() {
    this.experiencia();
  }

  experiencia(){
    this._serviceExpeciencia.getExperiencia().subscribe(
      response=>{
        if(response['ok']){
          response['experiencias'].forEach(element => {
            element.exp_actividades = element.exp_actividades.split(',');
            element.exp_tecnologias = element.exp_tecnologias.split(',');
            this.trabajos.push(element);
          });
        }else{
          alert(response['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

  nueva_experiencia(form){
    this._serviceExpeciencia.addExperiencia(this.modelo).subscribe(
      response=>{
        location.reload();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  eliminar_experiencia(id_experiencia){
    this._serviceExpeciencia.eliminar_experiencia(id_experiencia).subscribe(
      response=>{
        if(response['ok']){
         location.reload();
        }else{
          alert(response['message']);
        }
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
