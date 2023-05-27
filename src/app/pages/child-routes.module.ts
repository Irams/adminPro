import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProgressComponent } from './progress/progress.component';
import { RxjsComponent } from './rxjs/rxjs.component';

//Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  {path: '', component: DashboardComponent, data: { titulo: 'Dashboard' }},
  {path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes' }},
  {path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Búsquedas' }},
  {path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica 1' }},
  {path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' }},
  {path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' }},
  {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
  {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }},
  
  //Mantenimientos
  {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' }},
  {path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' }},
  {path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de Médicos' }},

  //Rutas de Admin
  {path: 'usuarios', canActivate:[AdminGuard], component: UsuariosComponent, data: { titulo: 'Mantenimiento de Usuarios' }},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
    exports: [RouterModule]
})
export class ChildRoutesModule { }
