import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent, UpperCaseTextComponent, PermissionComponent } from './_directives/index';
import { ToastyModule } from 'ng2-toasty';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { AuthGuard, VisibleGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { HeaderComponent } from './header/index';
import { SidebarComponent } from './sidebar/index';
import { UploadComponent } from './upload/index';
import { NguiDatetimePickerModule } from '@ngui/datetime-picker';
import { FileUploader, FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { DataTableModule } from "angular2-datatable";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        SidebarComponent,
        FileSelectDirective,
        FileDropDirective,
        UploadComponent
    ],
    providers: [
        AuthGuard,
        VisibleGuard,
        AlertService,
        AuthenticationService,
        UserService
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }