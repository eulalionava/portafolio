import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { InicioComponent } from '../app/componentes/inicio/inicio.component';
import { TecnologiaComponent } from '../app/componentes/tecnologia/tecnologia.component';
import { ProyectosComponent } from '../app/componentes/proyectos/proyectos.component';
import { LoginComponent } from '../app/componentes/login/login.component';
import { CargarImgsComponent } from '../app/componentes/cargar-imgs/cargar-imgs.component';
import { ExperienciaComponent } from '../app/componentes/experiencia/experiencia.component';
import { EditexperienciaComponent } from '../app/componentes/editexperiencia/editexperiencia.component';
import { AddadminComponent } from './componentes/addadmin/addadmin.component';
import { AddexperienciaComponent } from './componentes/addexperiencia/addexperiencia.component';
import { EditarProyectoComponent } from './componentes/editar-proyecto/editar-proyecto.component';


//Rutas
const appRoutes:Routes = [
    {path:'', component:InicioComponent},
    {path:'logeo', component:LoginComponent},
    {path:'inicio', component:InicioComponent},
    {path:'login', component:LoginComponent},
    {path:'tecnologia',component:TecnologiaComponent},
    {path:'proyectos',component:ProyectosComponent},
    {path:'experiencia',component:ExperienciaComponent},
    {path:'editar-experiencia/:idExp',component:EditexperienciaComponent},
    {path:'cargar-imagenes/:idpro',component:CargarImgsComponent},
    {path:'agregar-expeciencia',component:AddexperienciaComponent},
    {path:'editar-proyecto/:id',component:EditarProyectoComponent},
    {path:'agregar-admin',component:AddadminComponent},

    {path:'**', component:InicioComponent}
  
  ];

  export const appRoutingProviders: any[] = [];
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true});