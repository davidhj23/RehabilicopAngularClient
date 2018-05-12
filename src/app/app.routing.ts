import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';

import { LayoutComponent } from './layout/index';

import { RolesComponent } from './layout/seguridad/roles';

import { OpcionesComponent } from './layout/listas/opciones/index';
import { SedesComponent } from './layout/listas/sedes/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },

    { 
        path: 'layout', 
        component: LayoutComponent, 
        canActivate: [AuthGuard], 
        data : { permission: ["layout"]},
        children: 
            [{ path: 'roles', component: RolesComponent, canActivate: [AuthGuard], data : { permission: ["roles"] }},
             { path: 'opciones', component: OpcionesComponent, canActivate: [AuthGuard], data : { permission: ["opciones"] }},
             { path: 'sedes', component: SedesComponent, canActivate: [AuthGuard], data : { permission: ["sedes"] }}] 
    }, 

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);