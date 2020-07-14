import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  providers:[UsuarioService]
})
export class AddadminComponent implements OnInit {
  public usuario:Usuario;

  constructor(
    private _router:Router,
    private _serviceUsuario:UsuarioService
  ) { 
    this.usuario = new Usuario(1,'','','',0,'','','','');
  }

  ngOnInit() {
  }

  //capturar datos del evento chance del boton de imagen 
  public filesToUpload:Array<File>;
  fileChangeEvent(fileInput:any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  addAdmin(){
    this._serviceUsuario.nuevoUsuario(this.usuario).subscribe(
      response=>{
        console.log(response);
        if(response['ok']){
          this._router.navigate(['/login']);
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
