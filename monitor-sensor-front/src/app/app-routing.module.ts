import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    loadChildren: () => import('./core/auth/auth.module').then(el => el.AuthModule)
  },
  {
    path: 'sensors',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/Sensor/sensor.module').then(el => el.SensorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
