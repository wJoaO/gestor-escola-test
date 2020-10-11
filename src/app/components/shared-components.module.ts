import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeHeaderComponent } from './ge-header/ge-header.component';
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
    GeHeaderComponent,
  ],
  exports: [
    GeLoadingComponent,
    GeHeaderComponent
  ]
})
export class SharedComponentsModule { }