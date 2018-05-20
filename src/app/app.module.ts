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
        SeMuestra1Component
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
        SeMuestra1Service
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }