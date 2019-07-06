import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DataTableModule } from "angular2-datatable";
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';

import { UpperCaseTextComponent, PermissionComponent } from './_directives/index';
import { AuthGuard, VisibleGuard } from './_guards/index';

import { LayoutComponent } from './layout/index';
import { HeaderComponent } from './layout/shared/header/index';
import { SidebarComponent } from './layout/shared/sidebar/index';

import { LoginComponent } from './login/index';
import { AuthenticationService } from './layout/seguridad/usuarios/authentication.service';
import { UserService } from './layout/seguridad/usuarios/user.service';
import { ConsultarUsuariosComponent } from './layout/seguridad/usuarios/consultarUsuarios.component';
import { CrearUsuariosComponent } from './layout/seguridad/usuarios/crearUsuarios.component';
import { EditarUsuariosComponent } from './layout/seguridad/usuarios/editarUsuarios.component';
import { CambiarPasswordComponent } from './layout/seguridad/usuarios/cambiarPassword.component';
import { RestablecerPasswordComponent } from './layout/seguridad/usuarios/restablecerPassword.component';
import { RolesComponent, AsignarPermisosComponent, RolService } from './layout/seguridad/roles/index';
import { PermisoService } from './layout/seguridad/permisos/permiso.service';

import { OpcionesComponent, OpcionService } from './layout/listas/opciones/index';
import { SedesComponent, SedeService } from './layout/listas/sedes/index';
import { TiposDocumentosComponent, TipoDocumentoService } from './layout/listas/tipos-documentos/index';
import { Cie10sComponent, Cie10Service } from './layout/listas/cie10s/index';
import { EstadosCivilesComponent, EstadoCivilService } from './layout/listas/estados-civiles/index';
import { CamasComponent, CamaService } from './layout/listas/camas/index';
import { ServiciosComponent, ServicioService } from './layout/listas/servicios/index';
import { AlteracionesComponent, AlteracionService } from './layout/listas/alteraciones/index';
import { PatronesComponent, PatronService } from './layout/listas/patrones/index';
import { TonosVozComponent, TonoVozService } from './layout/listas/tonos-voz/index';
import { SeMuestra1Component, SeMuestra1Service } from './layout/listas/se-muestra1/index';
import { SeMuestra2Component, SeMuestra2Service } from './layout/listas/se-muestra2/index';
import { FormasComponent, FormaService } from './layout/listas/formas/index';
import { CursosComponent, CursoService } from './layout/listas/cursos/index';
import { MemoriaComponent, MemoriaService } from './layout/listas/memoria/index';
import { Memoria2Component, Memoria2Service } from './layout/listas/memoria2/index';
import { AlucinacionesComponent, AlucinacionService } from './layout/listas/alucinaciones/index';
import { FuerzaMuscularComponent, FuerzaMuscularService } from './layout/listas/fuerza-muscular/index';
import { MovilidadComponent, MovilidadService } from './layout/listas/movilidad/index';
import { MarchaComponent, MarchaService } from './layout/listas/marcha/index';
import { HumorComponent, HumorService } from './layout/listas/humor/index';
import { ExpresionFacial1Component, ExpresionFacial1Service } from './layout/listas/expresion-facial1/index';
import { ExpresionFacial2Component, ExpresionFacial2Service } from './layout/listas/expresion-facial2/index';
import { ExpresionFacial3Component, ExpresionFacial3Service } from './layout/listas/expresion-facial3/index';
import { AlimentacionesComponent, AlimentacionService } from './layout/listas/alimentaciones/index';
import { AparienciasComponent, AparienciaService } from './layout/listas/apariencias/index';
import { AseguradorasComponent, AseguradoraService } from './layout/listas/aseguradoras/index';
import { AsfixiasComponent, AsfixiaService } from './layout/listas/asfixias/index';
import { ComprensiblesComponent, ComprensibleService } from './layout/listas/comprensibles/index';
import { ConcienciasComponent, ConcienciaService } from './layout/listas/conciencias/index';
import { EscolaridadesComponent, EscolaridadService } from './layout/listas/escolaridades/index';
import { EstadosComponent, EstadoService } from './layout/listas/estados/index';
import { EstadosConcienciasComponent, EstadoConcienciaService } from './layout/listas/estados-conciencias/index';
import { AtencionesComponent, AtencionService } from './layout/listas/atenciones/index';
import { EquiposComponent, EquipoService } from './layout/listas/equipos/index';
import { GestasComponent, GestaService } from './layout/listas/gestas/index';
import { InteligenciasComponent, InteligenciaService } from './layout/listas/inteligencias/index';
import { IntrospeccionesComponent, IntrospeccionService } from './layout/listas/introspecciones/index';
import { MedicamentosComponent, MedicamentoService } from './layout/listas/medicamentos/index';
import { DosisComponent, DosisService } from './layout/listas/dosis/index';
import { OrganosComponent, OrganoService } from './layout/listas/organos/index';
import { ParentescosComponent, ParentescoService } from './layout/listas/parentescos/index';
import { SexosComponent, SexoService } from './layout/listas/sexos/index';
import { TiempoUsoComponent, TiempoUsoService } from './layout/listas/tiempos-usos/index';
import { TipoEntidadComponent, TipoEntidadService } from './layout/listas/tipos-entidades/index';
import { ViaIngresoComponent, ViaIngresoService } from './layout/listas/vias-ingresos/index';
import { RegimenesComponent, RegimenService } from './layout/listas/regimenes/index';

import { ConsultarPacientesComponent } from './layout/procesos/pacientes/consultarPacientes.component';
import { CrearPacientesComponent } from './layout/procesos/pacientes/crearPacientes.component';
import { EditarPacientesComponent } from './layout/procesos/pacientes/editarPacientes.component';
import { PacienteService } from './layout/procesos/pacientes/paciente.service';
import { ConsultarAdmisionesComponent } from './layout/procesos/admisiones/consultarAdmisiones.component';
import { CrearAdmisionesComponent } from './layout/procesos/admisiones/crearAdmisiones.component';
import { EditarAdmisionesComponent } from './layout/procesos/admisiones/editarAdmisiones.component';
import { AdmisionService } from './layout/procesos/admisiones/admision.service';
import { ConsultarHistoriasComponent } from './layout/procesos/historias/consultarHistorias.component';
import { CrearHistoriasComponent } from './layout/procesos/historias/crearHistorias.component';
import { EditarHistoriasComponent } from './layout/procesos/historias/editarHistorias.component';
import { HistoriaService } from './layout/procesos/historias/historia.service';
import { ConsultarOrdenMedicaComponent } from './layout/procesos/orden-medica/consultarOrdenMedica.component';
import { OrdenMedicaComponent } from './layout/procesos/orden-medica/ordenMedica.component';
import { EditarOrdenMedicaComponent } from './layout/procesos/orden-medica/editarOrdenMedica.component';
import { OrdenMedicaService } from './layout/procesos/orden-medica/ordenMedica.service';
import { HojaEventualComponent } from './layout/procesos/hoja-eventual/hojaEventual.component';
import { HojaEventualService } from './layout/procesos/hoja-eventual/hojaEventual.service';
import { EvolucionComponent } from './layout/procesos/evoluciones/evolucion.component';
import { EvolucionService } from './layout/procesos/evoluciones/evolucion.service';
import { ConsultarEpicrisisComponent } from './layout/procesos/epicrisis/consultarEpicrisis.component';
import { EpicrisisComponent } from './layout/procesos/epicrisis/epicrisis.component';
import { EditarEpicrisisComponent } from './layout/procesos/epicrisis/editarEpicrisis.component';
import { EpicrisisService } from './layout/procesos/epicrisis/epicrisis.service';
import { SignosVitalesComponent } from './layout/procesos/signos-vitales/SignosVitales.component';
import { SignosVitalesService } from './layout/procesos/signos-vitales/SignosVitales.service';
import { NotasDeEnfermeriaComponent } from './layout/procesos/notas-de-enfermeria/notasDeEnfermeria.component';
import { NotasDeEnfermeriaService } from './layout/procesos/notas-de-enfermeria/notasDeEnfermeria.service';
import { AdministracionDeMedicamentosComponent } from './layout/procesos/administracion-de-medicamentos/administracionDeMedicamentos.component';
import { AdministracionDeMedicamentosService } from './layout/procesos/administracion-de-medicamentos/administracionDeMedicamentos.service';
import { AuditoriaComponent } from './layout/procesos/evoluciones/auditoria.component';

import { ParametrizarEvolucionesComponent } from './layout/configuracion/evoluciones/parametrizarEvoluciones.component';
import { ParametrizarEvolucionService } from './layout/configuracion/evoluciones/parametrizarEvolucion.service';

@NgModule({
    imports: [
        BrowserModule,        
        FormsModule,
        NguiDatetimePickerModule,
        HttpClientModule,
        routing,
        DataTableModule,
        TextMaskModule,

        ToastyModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,        
        UpperCaseTextComponent,
        PermissionComponent,
        FileSelectDirective,
        FileDropDirective,

        LoginComponent,
        ConsultarUsuariosComponent,
        CrearUsuariosComponent,
        EditarUsuariosComponent,
        RolesComponent,
        AsignarPermisosComponent,
        CambiarPasswordComponent,
        RestablecerPasswordComponent,

        LayoutComponent,
        HeaderComponent,
        SidebarComponent,          

        OpcionesComponent,
        SedesComponent,
        TiposDocumentosComponent,
        Cie10sComponent,
        EstadosCivilesComponent,
        CamasComponent,
        ServiciosComponent,
        AlteracionesComponent,
        PatronesComponent,
        TonosVozComponent,
        SeMuestra1Component,
        SeMuestra2Component,
        FormasComponent,
        CursosComponent,
        MemoriaComponent,
        Memoria2Component,
        AlucinacionesComponent,
        FuerzaMuscularComponent,
        MovilidadComponent, 
        MarchaComponent, 
        HumorComponent, 
        ExpresionFacial1Component,
        ExpresionFacial2Component,
        ExpresionFacial3Component,
        AlimentacionesComponent,
        AparienciasComponent,
        AseguradorasComponent,
        AsfixiasComponent,
        ComprensiblesComponent,
        ConcienciasComponent,
        EscolaridadesComponent,
        EstadosComponent,
        EstadosConcienciasComponent,
        AtencionesComponent,
        EquiposComponent,
        GestasComponent,
        InteligenciasComponent,
        IntrospeccionesComponent,
        MedicamentosComponent,
        DosisComponent,
        OrganosComponent,
        ParentescosComponent,
        SexosComponent,
        TiempoUsoComponent,
        TipoEntidadComponent,
        ViaIngresoComponent,
        RegimenesComponent,

        ConsultarPacientesComponent,
        CrearPacientesComponent,
        EditarPacientesComponent,

        ConsultarAdmisionesComponent,
        CrearAdmisionesComponent,
        EditarAdmisionesComponent,

        ConsultarHistoriasComponent,
        CrearHistoriasComponent,        
        EditarHistoriasComponent,
        ConsultarOrdenMedicaComponent,
        OrdenMedicaComponent,
        EditarOrdenMedicaComponent,
        ConsultarEpicrisisComponent,
        EpicrisisComponent,
        EditarEpicrisisComponent,
        SignosVitalesComponent,
        NotasDeEnfermeriaComponent,
        AdministracionDeMedicamentosComponent,

        HojaEventualComponent,
        EvolucionComponent,
        AuditoriaComponent,

        ParametrizarEvolucionesComponent
    ],
    providers: [
        AuthGuard,
        VisibleGuard,

        AuthenticationService,
        UserService,
        RolService,
        PermisoService,
        
        OpcionService,
        SedeService,
        TipoDocumentoService,
        Cie10Service,
        EstadoCivilService,
        CamaService,
        ServicioService,
        AlteracionService,
        PatronService,
        TonoVozService,
        SeMuestra1Service,
        SeMuestra2Service,
        FormaService,
        CursoService,
        MemoriaService,
        Memoria2Service,
        AlucinacionService,
        FuerzaMuscularService,
        MovilidadService,
        MarchaService,
        HumorService,
        ExpresionFacial1Service,
        ExpresionFacial2Service,
        ExpresionFacial3Service,
        AlimentacionService,
        AparienciaService,
        AseguradoraService,
        AsfixiaService,
        ComprensibleService,
        ConcienciaService, 
        EscolaridadService, 
        EstadoService, 
        EstadoConcienciaService, 
        AtencionService, 
        EquipoService, 
        GestaService,
        InteligenciaService, 
        IntrospeccionService, 
        MedicamentoService,
        DosisService,
        OrganoService, 
        ParentescoService,
        SexoService,
        TiempoUsoService,
        TipoEntidadService,
        ViaIngresoService,
        RegimenService,
        
        PacienteService,
        AdmisionService,
        HistoriaService,
        OrdenMedicaService,
        EpicrisisService,
        HojaEventualService,
        EvolucionService,
        SignosVitalesService,
        NotasDeEnfermeriaService,
        AdministracionDeMedicamentosService,

        ParametrizarEvolucionService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }