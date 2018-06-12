import { Routes, RouterModule } from '@angular/router';

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
import { SeMuestra2Component } from './layout/listas/se-muestra2/index';
import { FormasComponent } from './layout/listas/formas/index';
import { CursosComponent } from './layout/listas/cursos/index';
import { MemoriaComponent } from './layout/listas/memoria/index';
import { AlucinacionesComponent } from './layout/listas/alucinaciones/index';
import { FuerzaMuscularComponent } from './layout/listas/fuerza-muscular/index';
import { MovilidadComponent } from './layout/listas/movilidad/index';
import { MarchaComponent } from './layout/listas/marcha/index';
import { HumorComponent } from './layout/listas/humor/index';
import { ExpresionFacial1Component } from './layout/listas/expresion-facial1/index';
import { ExpresionFacial2Component } from './layout/listas/expresion-facial2/index';
import { ExpresionFacial3Component } from './layout/listas/expresion-facial3/index';
import { AlimentacionesComponent } from './layout/listas/alimentaciones/index';
import { AparienciasComponent } from './layout/listas/apariencias/index';
import { AseguradorasComponent } from './layout/listas/aseguradoras/index';
import { AsfixiasComponent } from './layout/listas/asfixias/index';
import { ComprensiblesComponent } from './layout/listas/comprensibles/index';
import { ConcienciasComponent } from './layout/listas/conciencias/index';
import { EscolaridadesComponent } from './layout/listas/escolaridades/index';
import { EstadosComponent } from './layout/listas/estados/index';
import { EstadosConcienciasComponent } from './layout/listas/estados-conciencias/index';
import { AtencionesComponent } from './layout/listas/atenciones/index';
import { EquiposComponent } from './layout/listas/equipos/index';
import { GestasComponent } from './layout/listas/gestas/index';
import { InteligenciasComponent } from './layout/listas/inteligencias/index';
import { IntrospeccionesComponent } from './layout/listas/introspecciones/index';
import { MedicamentosComponent } from './layout/listas/medicamentos/index';
import { Memoria2Component } from './layout/listas/memoria2/index';

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
                { path: 'listas/se-muestra1', component: SeMuestra1Component, canActivate: [AuthGuard], data : { permission: ["se muestra1"] }},                
                { path: 'listas/se-muestra2', component: SeMuestra2Component, canActivate: [AuthGuard], data : { permission: ["se muestra2"] }},
                { path: 'listas/cursos', component: CursosComponent, canActivate: [AuthGuard], data : { permission: ["curso"] }},
                { path: 'listas/formas', component: FormasComponent, canActivate: [AuthGuard], data : { permission: ["forma"] }},
                { path: 'listas/memoria', component: MemoriaComponent, canActivate: [AuthGuard], data : { permission: ["memoria"] }},
                { path: 'listas/memoria2', component: Memoria2Component, canActivate: [AuthGuard], data : { permission: ["memoria2"] }},
                { path: 'listas/alucinaciones', component: AlucinacionesComponent, canActivate: [AuthGuard], data : { permission: ["alucinacion"] }},                               
                { path: 'listas/fuerza-muscular', component: FuerzaMuscularComponent, canActivate: [AuthGuard], data : { permission: ["fuerza muscular"] }},
                { path: 'listas/movilidad', component: MovilidadComponent, canActivate: [AuthGuard], data : { permission: ["movilidad"] }},
                { path: 'listas/marcha', component: MarchaComponent, canActivate: [AuthGuard], data : { permission: ["marcha"] }},
                { path: 'listas/humor', component: HumorComponent, canActivate: [AuthGuard], data : { permission: ["humor"] }},
                { path: 'listas/expresion-facial1', component: ExpresionFacial1Component, canActivate: [AuthGuard], data : { permission: ["expresion facial1"] }},
                { path: 'listas/expresion-facial2', component: ExpresionFacial2Component, canActivate: [AuthGuard], data : { permission: ["expresion facial2"] }},
                { path: 'listas/expresion-facial3', component: ExpresionFacial3Component, canActivate: [AuthGuard], data : { permission: ["expresion facial3"] }},
                { path: 'listas/alimentacion', component: AlimentacionesComponent, canActivate: [AuthGuard], data : { permission: ["alimentacion"] }},
                { path: 'listas/apariencias', component: AparienciasComponent, canActivate: [AuthGuard], data : { permission: ["apariencia"] }},
                { path: 'listas/aseguradoras', component: AseguradorasComponent, canActivate: [AuthGuard], data : { permission: ["aseguradora"] }},
                { path: 'listas/asfixias', component: AsfixiasComponent, canActivate: [AuthGuard], data : { permission: ["asfixia"] }},
                { path: 'listas/comprensibles', component: ComprensiblesComponent, canActivate: [AuthGuard], data : { permission: ["compresible"] }},
                { path: 'listas/conciencias', component: ConcienciasComponent, canActivate: [AuthGuard], data : { permission: ["conciencia"] }},
                { path: 'listas/escolaridades', component: EscolaridadesComponent, canActivate: [AuthGuard], data : { permission: ["escolaridad"] }},
                { path: 'listas/estados', component: EstadosComponent, canActivate: [AuthGuard], data : { permission: ["estado"] }},
                { path: 'listas/estados-conciencia', component: EstadosConcienciasComponent, canActivate: [AuthGuard], data : { permission: ["estado conciencia"] }},
                { path: 'listas/atenciones', component: AtencionesComponent, canActivate: [AuthGuard], data : { permission: ["atencion"] }},
                { path: 'listas/equipos', component: EquiposComponent, canActivate: [AuthGuard], data : { permission: ["equipo"] }},
                { path: 'listas/gestas', component: GestasComponent, canActivate: [AuthGuard], data : { permission: ["gesta"] }},
                { path: 'listas/inteligencias', component: InteligenciasComponent, canActivate: [AuthGuard], data : { permission: ["inteligencia"] }},
                { path: 'listas/introspecciones', component: IntrospeccionesComponent, canActivate: [AuthGuard], data : { permission: ["introspeccion"] }},
                { path: 'listas/medicamentos', component: MedicamentosComponent, canActivate: [AuthGuard], data : { permission: ["medicamento"] }}
                
            ] 
    }, 

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);