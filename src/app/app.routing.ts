import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//componentes
import { InicioComponent } from '../app/componentes/inicio/inicio.component';
import { TecnologiaComponent } from '../app/componentes/tecnologia/tecnologia.component';
import { ProyectosComponent } from '../app/componentes/proyectos/proyectos.component';
import { LoginComponent } from '../app/componentes/login/login.component';
import { AgregarTecComponent } from '../app/componentes/agregar-tec/agregar-tec.component';
import { AddproyectoComponent } from '../app/componentes/addproyecto/addproyecto.component';
import { CargarImgsComponent } from '../app/componentes/cargar-imgs/cargar-imgs.component';
import { ExperienciaComponent } from '../app/componentes/experiencia/experiencia.component';
import { EditexperienciaComponent } from '../app/componentes/editexperiencia/editexperiencia.component';

//Rutas
const appRoutes:Routes = [
    {path:'', component:InicioComponent},
    {path:'logeo', component:LoginComponent},
    {path:'agregar-tecnologia', component:AgregarTecComponent},
    {path:'inicio', component:InicioComponent},
    {path:'login', component:LoginComponent},
    {path:'tecnologia',component:TecnologiaComponent},
    {path:'proyectos',component:ProyectosComponent},
    {path:'experiencia',component:ExperienciaComponent},
    {path:'agregar-proyecto',component:AddproyectoComponent},
    {path:'editar-experiencia/:idExp',component:EditexperienciaComponent},
    {path:'cargar-imagenes/:idpro',component:CargarImgsComponent},

    {path:'**', component:InicioComponent}
  
  ];

  export const appRoutingProviders: any[] = [];
  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: true});