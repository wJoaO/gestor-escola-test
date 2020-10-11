import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'escola/lista',
    loadChildren: () => import('./pages/school-list/school-list.module').then(m => m.SchoolListPageModule)
  },
  {
    path: 'escola/detalhe',
    redirectTo: 'escola/detalhe/',
    pathMatch: 'full'
  },
  {
    path: 'escola/detalhe/:id',
    loadChildren: () => import('./pages/school-detail/school-detail.module').then(m => m.SchoolDetailPageModule)
  },
  {
    path: '',
    redirectTo: 'escola/lista',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
