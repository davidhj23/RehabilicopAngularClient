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
        SedesComponent
    ],
    providers: [
        AuthGuard,
        VisibleGuard,

        AuthenticationService,
        UserService,
        RolService,
        
        OpcionService,
        SedeService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }