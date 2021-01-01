import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css'],
  providers:[ProyectoService]
})
export class ImagenesComponent implements OnInit {
  public id_proyecto;
  public proyecto = [];
  public imagenes = [];

  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _serviceProyecto:ProyectoService
  ) { 
    this.id_proyecto = parseInt(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getProyecto();
    this.getAllImagenes();
  }

  getProyecto(){
    this._serviceProyecto.getProyecto(this.id_proyecto).subscribe(
      response=>{
        console.log(response);
        this.proyecto = response['proyecto'];
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

  getAllImagenes(){
    this._serviceProyecto.get_all_images(this.id_proyecto).subscribe(
      response=>{
        console.log(response);
        this.imagenes = response['images'];
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
