import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PedidoPage } from 'src/app/forms/pedido/pedido.page';
import { CalculadoraComponent } from './calculadora.component';


const routes: Routes = [
  {
    path: '',
    component: CalculadoraComponent
  },
  {
    path: '/pedido',
    component: PedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPageRoutingModule {}
