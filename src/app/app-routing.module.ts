import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/pages/about/about.component';
import { HomeComponent } from './components/pages/home/home.component';
import { VestidoComponent } from './components/pages/vestido/vestido.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'about', component: AboutComponent},
  {path:'vestidos/:id', component: VestidoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
