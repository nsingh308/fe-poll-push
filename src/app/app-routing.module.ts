import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PushDataComponent } from './push-data/push-data.component';
import { PollDataComponent } from './poll-data/poll-data.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth-guard.service';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [
  { path:'',component: HomeComponent},
  { path:'push',canActivate:[AuthGuard],component: PushDataComponent},
  //{ path:'poll/:id',component: PollDataComponent},
  { path:'login',component: LoginComponent},
  { path:'poll', canActivate:[AuthGuard],component: PollDataComponent},
  {path:'page-not-found',component:PageNotFoundComponent},
  {path:'unauthorized',component:UnauthorizedComponent},
  {path:'**',redirectTo:'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
