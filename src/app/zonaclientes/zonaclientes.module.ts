import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';

import { AuthRoutingModule } from './zonaclientes.routing.module';

import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialModule],
})
export class ZonaclientesModule {}
