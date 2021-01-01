import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ExperienciaService } from '../../services/experiencia.service';
import { Experiencia } from '../../modelos/experiencia';
import { Expression } from '@angular/compiler';

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
    this.experiencia = new Experiencia(1,'','','','','','','','','',1);
    this.idexp = parseInt( this._route.snapshot.paramMap.get('idExp'));
    this.getexperiencia();
  }

  getexperiencia(){
    this._serviceExperiencia.getExpPorId(this.idexp).subscribe(
      response=>{
        this.trabajos = response['experiencia'];
        this.experiencia.id           = this.trabajos.exp_id;
        this.experiencia.empresa      = this.trabajos.exp_empresa;
        this.experiencia.direccion    = this.trabajos.exp_direccion;
        this.experiencia.duracion     = this.trabajos.exp_duracion;
        this.experiencia.inicio       = this.trabajos.exp_inicio;
        this.experiencia.fin          = this.trabajos.exp_fin;
        this.experiencia.cargo        = this.trabajos.exp_cargo;
        this.experiencia.descripcion  = this.trabajos.exp_descripcion;
        this.experiencia.actividad    = this.trabajos.exp_actividades;
        this.experiencia.tecnologia   = this.trabajos.exp_tecnologias;
        console.log(this.experiencia);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  //EVENTO CLICK PARA GUARDAR CAMBIOS
  guardarCambios(){
     let valida = this.validaciones(this.experiencia);

     if(valida.ok){
       this._serviceExperiencia.editExperience(this.experiencia).subscribe(
         response=>{
           this._router.navigate(['/experiencia']);
         },
         error=>{
           console.log(<any>error);
         }
       )
     }else{
       alert(valida.message);
     }
  }

  validaciones(datos:Experiencia){
    if(datos.empresa == ""){
      document.getElementById('empresa').style.border = "1px solid red";
      return{
        ok:false,
        message:"El campo empresa no puede ser null"
      }
    }else if(datos.direccion == ""){
      document.getElementById('direccion').style.border = "1px solid red";
      return{
        ok:false,
        message:"El campo direccion no puede ser null"
      }
    }else if( datos.duracion == "" || datos.duracion.length > 5){
      document.getElementById('duracion').style.border = "1px solid red";
      return{
        ok:false,
        message:"El campo duracion no puede estar vacio o ser mayor de 5"
      }
    }else if(datos.inicio == ""){
      document.getElementById('inicio').style.border = "1px solid red";
      return{
        ok:false,
        message:"Debe especificar una fecha de entrada"
      }
    }else if(datos.fin == ""){
      document.getElementById('fin').style.border = "1px solid red";
      return{
        ok:false,
        message:"Debe especificar una fecha de salida"
      }
    }else if(datos.descripcion == ""){
      document.getElementById('descripcion').style.border = "1px solid red";
      return{
        ok:false,
        message:"El campo descripcion no puede ser null o ser mayor de 5"
      }
    }else if(datos.actividad == ""){
      document.getElementById('actividad').style.border = "1px solid red";
      return{
        ok:false,
        message:"El campo actividades no puede ser null o ser mayor de 5"
      }
    }else if(datos.tecnologia == ""){
      document.getElementById('tecnologia').style.border = "1px solid red";
      return{
        ok:false,
        message:"El campo tecnologias no puede estar vacio"
      }
    }else{
      return{
        ok:true,
        messaje:"validaciones correctas"
      }
    }
  }

}
