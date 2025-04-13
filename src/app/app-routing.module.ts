import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/forms', 
    pathMatch: 'full' 
  },
  {
    path: 'forms',
    loadChildren: () => import('./features/form-builder/form-builder.module').then(m => m.FormBuilderModule)
  },
  {
    path: '**',
    redirectTo: '/forms'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }