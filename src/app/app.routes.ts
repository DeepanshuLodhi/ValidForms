import { Routes } from '@angular/router';

export const routes: Routes = [
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