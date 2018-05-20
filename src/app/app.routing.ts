﻿import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';

import { LayoutComponent } from './layout/index';

import { LoginComponent } from './login/index';
import { RolesComponent } from './layout/seguridad/roles';

import { OpcionesComponent } from './layout/listas/opciones/index';
import { SedesComponent } from './layout/listas/sedes/index';
import { TiposDocumentosComponent } from './layout/listas/tipos-documentos/index';
import { Cie10sComponent } from './layout/listas/cie10s/index';
import { EstadosCivilesComponent } from './layout/listas/estados-civiles/index';
import { CamasComponent } from './layout/listas/camas/index';
import { ServiciosComponent } from './layout/listas/servicios/index';
import { AlteracionesComponent } from './layout/listas/alteraciones/index';
import { PatronesComponent } from './layout/listas/patrones/index';
import { TonosVozComponent } from './layout/listas/tonos-voz/index';
import { SeMuestra1Component } from './layout/listas/se-muestra1/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },

    { 
        path: 'layout', 
        component: LayoutComponent, 
        canActivate: [AuthGuard], 
        data : { permission: ["layout"]},
        children: 
            [
                { path: 'seguridad/roles', component: RolesComponent, canActivate: [AuthGuard], data : { permission: ["roles"] }}, 
             
                { path: 'listas/opciones', component: OpcionesComponent, canActivate: [AuthGuard], data : { permission: ["opciones"] }},
                { path: 'listas/sedes', component: SedesComponent, canActivate: [AuthGuard], data : { permission: ["sedes"] }},
                { path: 'listas/tipos-documentos', component: TiposDocumentosComponent, canActivate: [AuthGuard], data : { permission: ["tipos documentos"] }},
                { path: 'listas/cie10s', component: Cie10sComponent, canActivate: [AuthGuard], data : { permission: ["cie10s"] }},
                { path: 'listas/estados-civiles', component: EstadosCivilesComponent, canActivate: [AuthGuard], data : { permission: ["estados civiles"] }},
                { path: 'listas/camas', component: CamasComponent, canActivate: [AuthGuard], data : { permission: ["camas"] }},
                { path: 'listas/servicios', component: ServiciosComponent, canActivate: [AuthGuard], data : { permission: ["servicios"] }},
                { path: 'listas/alteraciones', component: AlteracionesComponent, canActivate: [AuthGuard], data : { permission: ["alteraciones"] }},
                { path: 'listas/patrones', component: PatronesComponent, canActivate: [AuthGuard], data : { permission: ["patrones"] }},
                { path: 'listas/tonos-voz', component: TonosVozComponent, canActivate: [AuthGuard], data : { permission: ["tonos voz"] }},
                { path: 'listas/se-muestra1', component: SeMuestra1Component, canActivate: [AuthGuard], data : { permission: ["se muestra1"] }}
                
            ] 
    }, 

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);