import { Component } from '@angular/core';
import { UsuarioService} from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UsuarioService]
})
export class AppComponent {
  title = 'miportafolio';
  constructor(
    public _serviceUsuario:UsuarioService
  ){

  }

  salir(){
    localStorage.clear();
  }
}

