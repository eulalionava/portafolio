import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ExperienciaService } from '../../services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
  providers:[ExperienciaService]
})
export class ExperienciaComponent implements OnInit {
  public trabajos:any;

  constructor(
    private _serviceExpeciencia:ExperienciaService,
    private _router:Router
  ){ 

  }

  ngOnInit() {
    this.experiencia();
  }

  experiencia(){
    this._serviceExpeciencia.getExperiencia().subscribe(
      response=>{
        console.log(response);
        this.trabajos = response['data']; 
        console.log(this.trabajos);
      },
      error=>{
        console.log(<any>error);
      }

    )
  }

}
