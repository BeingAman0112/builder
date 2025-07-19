import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Builder } from './builder/Component/builder';

const routes: Routes = [
  { path: '', component: Builder }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
