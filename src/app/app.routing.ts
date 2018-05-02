import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

import { LayoutComponent } from './layout/index';
import { RolesComponent } from './layout/roles/index';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { 
        path: 'layout', 
        component: LayoutComponent, 
        canActivate: [AuthGuard], 
        data : { permission: ["layout"]},
        children: 
            [{ path: 'roles', component: RolesComponent, canActivate: [AuthGuard], data : { permission: ["roles"] }}
            ] 
    }, 

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);