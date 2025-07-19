import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderRoutingModule } from './builder-routing-module';
import { Builder } from './Component/builder';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    Builder
  ],
  imports: [
    CommonModule,
    BuilderRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class BuilderModule { }
