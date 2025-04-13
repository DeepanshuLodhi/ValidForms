import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormContainerComponent } from './components/form-container/form-container.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'form1',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: FormContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormBuilderRoutingModule { }