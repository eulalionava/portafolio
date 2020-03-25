import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../modelos/experiencia';

@Component({
  selector: 'app-editexperiencia',
  templateUrl: './editexperiencia.component.html',
  styleUrls: ['./editexperiencia.component.css'],
  providers:[ExperienciaService]
})
export class EditexperienciaComponent implements OnInit {
  public idexp;
  public experiencia:Experiencia;
  public trabajos:any;

  constructor(
    private _serviceExperiencia:ExperienciaService,
    private _route:ActivatedRoute,
    private _router:Router
  ){ 
    
  }

  ngOnInit() {
    this.experiencia = new Experiencia(1,'','','','','','','');
    this.idexp = parseInt( this._route.snapshot.paramMap.get('idExp'));
    this.getexperiencia();
  }

  getexperiencia(){
    this._serviceExperiencia.getExpPorId(this.idexp).subscribe(
      response=>{
        this.trabajos = response['data'][0];
        this.experiencia.id           = this.trabajos['IDexp'];
        this.experiencia.empresa      = this.trabajos['exp_empresa'];
        this.experiencia.duracion     = this.trabajos['exp_duracion'];
        this.experiencia.inicio       = this.trabajos['exp_fechaInicio'];
        this.experiencia.fin          = this.trabajos['exp_fechaFin'];
        this.experiencia.cargo        = this.trabajos['exp_cargo'];
        this.experiencia.descripcion  = this.trabajos['exp_descripcion'];
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //EVENTO CLICK PARA GUARDAR CAMBIOS
  guardarCambios(){
    this._serviceExperiencia.editExperience(this.experiencia).subscribe(
      response=>{
        console.log(response);
        this._router.navigate(['/experiencia']);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
