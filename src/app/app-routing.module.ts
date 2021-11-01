import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputRouteComponent } from './input-route/input-route.component';
import { OutputRouteComponent } from './output-route/output-route.component';

//default route will open to properties page endpoint
const routes: Routes = [
  { path: '', redirectTo: '/input', pathMatch: 'full' },
  { path: 'input', component: InputRouteComponent },
  { path: 'output', component: OutputRouteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
