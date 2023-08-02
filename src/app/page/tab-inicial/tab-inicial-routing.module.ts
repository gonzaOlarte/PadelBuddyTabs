import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabInicialPage } from './tab-inicial.page';

const routes: Routes = [
  {
    path: '',
    component: TabInicialPage, 
    children:[
      {
        path: 'clientes',
        // loadChildren: () => import('./../../page/clientes/clientes.module').then( m => m.ClientesPageModule)
        loadChildren: () => import('../clientes/clientes.module').then( m => m.ClientesPageModule)
      },
      {
        path: 'fotos',
        // loadChildren: () => import('./page/fotos/fotos.module').then( m => m.FotosPageModule)
        loadChildren: () => import('../fotos/fotos.module').then( m => m.FotosPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabInicialPageRoutingModule {}
