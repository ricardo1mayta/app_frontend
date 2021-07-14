import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { MaterialModule } from './../material/material.module';
import { NotFoundRoutingModule } from './notFound-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    SharedModule,
    SharedModule,
    MaterialModule,
  ],
})
export class NotFoundModule {}
