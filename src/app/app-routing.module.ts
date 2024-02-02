import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EditarComponent } from './editar/editar.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'editar/:id', component:EditarComponent},
  {path:'home-admin', component:HomeAdminComponent},
  {path:'signin', component:SigninComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
