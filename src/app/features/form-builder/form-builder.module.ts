import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonFormsModule } from '@jsonforms/angular';
import { vanillaRenderers } from '@jsonforms/vanilla-renderers';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { CustomRatingControlComponent } from './renderers/custom-rating-control.component';
import { customRatingControlTester } from './renderers/custom-rating-control.tester';

@NgModule({
  imports: [
    CommonModule,
    FormBuilderRoutingModule,
    JsonFormsModule
  ],
  providers: [
    { 
      provide: 'renderers', 
      useValue: vanillaRenderers, 
      multi: true 
    }
  ]
})
export class FormBuilderModule { }