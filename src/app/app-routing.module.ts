import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'cambio-coche',
    pathMatch: 'full'
  },
  {
    path: 'detalles',
    loadChildren: () => import('./autos/detalles/detalles.module').then( m => m.DetallesPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./forms/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'cambio-coche',
    loadChildren: () => import('./forms/cambio-coche/cambio-coche.module').then( m => m.CambioCochePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
