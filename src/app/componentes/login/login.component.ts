import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../modelos/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    this.usuario = new Usuario(1,'','','',0,'','','','')
  }

  ngOnInit() {
    this.fallo = false;
    
    const sign_in_btn = document.querySelector("#sign-in-btn");
    const sign_up_btn = document.querySelector("#sign-up-btn");
    const container = document.querySelector(".container");

    sign_up_btn.addEventListener("click", () => {
      container.classList.add("sign-up-mode");
    });

    sign_in_btn.addEventListener("click", () => {
      container.classList.remove("sign-up-mode");
    });

  }
  //Inicio de sesion
  iniciar(){
    this._usuarioService.iniciarsesion(this.usuario.usuario,this.usuario.contrasena).subscribe(
      response=>{
        console.log(response);
        if(response['ok']){
          localStorage.setItem('admin',JSON.stringify(response['usuario']));
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

  //Nuevo registro de usuario
  nuevosRegistro(){

    let clave = prompt("Digita la clave de administrador");

    if(clave == "141993.ecn"){

      this._usuarioService.nuevoUsuario(this.usuario).subscribe(
        response=>{
          
        },
        error=>{
          console.log(<any>error);
        }
      );

    }else{
      alert("Necesitas la clave de aministrador ,para realizar un registro");
    }
  }

}
