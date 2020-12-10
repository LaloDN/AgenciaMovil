import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambioCochePage } from './cambio-coche.page';

const routes: Routes = [
  {
    path: '',
    component: CambioCochePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambioCochePageRoutingModule {}
