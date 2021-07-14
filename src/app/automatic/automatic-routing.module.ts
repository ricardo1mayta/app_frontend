import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviofacturasComponent } from './enviofacturas/enviofacturas.component';

const routes: Routes = [
  {
    path: 'enviofacturas',
    component: EnviofacturasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomaticRoutingModule {}
