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

import { UpperCaseTextComponent, PermissionComponent } from './_directives/index';
import { AuthGuard, VisibleGuard } from './_guards/index';

import { LayoutComponent } from './layout/index';
import { HeaderComponent } from './layout/shared/header/index';
import { SidebarComponent } from './layout/shared/sidebar/index';

import { LoginComponent } from './login/index';
import { AuthenticationService } from './layout/seguridad/usuarios/authentication.service';
import { UserService } from './layout/seguridad/usuarios/user.service';
import { RolesComponent, RolService } from './layout/seguridad/roles/index';

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

@NgModule({
    imports: [
        BrowserModule,        
        FormsModule,
        NguiDatetimePickerModule,
        HttpClientModule,
        routing,
        DataTableModule,

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
        RolesComponent,

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
        InteligenciasComponent        
    ],
    providers: [
        AuthGuard,
        VisibleGuard,

        AuthenticationService,
        UserService,
        RolService,
        
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
        InteligenciaService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }