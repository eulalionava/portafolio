import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { TecnologiaComponent } from './componentes/tecnologia/tecnologia.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditarTecComponent } from './componentes/editar-tec/editar-tec.component';
import { EditexperienciaComponent } from './componentes/editexperiencia/editexperiencia.component';
import { AddadminComponent } from './componentes/addadmin/addadmin.component';
import { EditarProyectoComponent } from './componentes/editar-proyecto/editar-proyecto.component';
import { ImagenesComponent } from './componentes/imagenes/imagenes.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ProyectosComponent,
    ExperienciaComponent,
    ContactoComponent,
    TecnologiaComponent,
    LoginComponent,
    EditarTecComponent,
    EditexperienciaComponent,
    AddadminComponent,
    EditarProyectoComponent,
    ImagenesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
