import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers:[UsuarioService]
})
export class LoginComponent implements OnInit {
  public fallo:boolean;
  public usuario:Usuario;

  constructor(
    private _usuarioService:UsuarioService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.usuario = new Usuario(1,'','','',0,'','','','','')
  }

  ngOnInit() {
    this.fallo = false;
  }

  iniciar(){
    this._usuarioService.iniciarsesion(this.usuario.usuario,this.usuario.contrasena).subscribe(
      response=>{
        console.log(response);
        if(response['code'] == 200){
          localStorage.setItem('admin',JSON.stringify(response['data'][0]));
          this._router.navigate(['/inicio']);
        }else{
          this.fallo = true;
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

}
