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
  public usuario:Usuario;

  constructor(
    private _usuarioService:UsuarioService,
    private _route:ActivatedRoute,
    private _router:Router
  ) { 
    this.usuario = new Usuario(1,'','','',0,'','','','','')
  }

  ngOnInit() {
  }

  iniciar(){
    console.log(this.usuario.usuario +" " + this.usuario.contrasena);
  }

}
