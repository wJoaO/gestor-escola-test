import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeLoadingComponent } from './ge-loading/ge-loading.component';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GeLoadingComponent,
  ],
  exports: [
    GeLoadingComponent,
  ]
})
export class SharedComponentsModule { }