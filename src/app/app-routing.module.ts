import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
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
  // {
  //   path: 'sucursales',
  //   loadChildren: () => import('./sucursales/sucursales.module').then( m => m.SucursalesPageModule)
  // }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
