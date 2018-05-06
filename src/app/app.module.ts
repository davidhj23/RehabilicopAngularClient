import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DataTableModule } from "angular2-datatable";
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { ToastyModule } from 'ng2-toasty';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AlertComponent, UpperCaseTextComponent, PermissionComponent } from './_directives/index';
import { AuthGuard, VisibleGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, RolService } from './_services/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

import { LayoutComponent } from './layout/index';
import { HeaderComponent } from './layout/header/index';
import { SidebarComponent } from './layout/sidebar/index';
import { RolesComponent } from './layout/roles/index';
import { UploadComponent } from './layout/upload/index';

@NgModule({
    imports: [
        BrowserModule,
        DataTableModule,
        FormsModule,
        NguiDatetimePickerModule,
        HttpClientModule,
        routing,
        ToastyModule.forRoot(),
        NgIdleKeepaliveModule.forRoot(),
        NgbModule.forRoot()
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        UpperCaseTextComponent,
        PermissionComponent,
        FileSelectDirective,
        FileDropDirective,

        LoginComponent,
        RegisterComponent,

        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        RolesComponent,        
        UploadComponent
    ],
    providers: [
        AuthGuard,
        VisibleGuard,
        AlertService,
        AuthenticationService,
        UserService,
        RolService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }