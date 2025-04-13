import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from '../../../../core/services/form.service';
import { FormConfig } from '../../../../core/models/form.models';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormRendererComponent } from '../form-renderer/form-renderer.component';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormRendererComponent
  ]
})
export class FormContainerComponent implements OnInit, OnDestroy {
  formConfig: FormConfig | null = null;
  debugMode = false;
  private routeSub: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      const formId = params['id'];
      if (formId) {
        this.loadFormConfig(formId);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadFormConfig(formId: string): void {
    this.formService.getFormConfigById(formId).subscribe(
      (formConfig) => {
        if (formConfig) {
          this.formConfig = formConfig;
          this.formService.setCurrentFormConfig(formConfig);
          console.log('Loaded form config:', formConfig);
        } else {
          // Form not found, redirect to the first form
          this.router.navigate(['/forms/form1']);
        }
      },
      (error) => {
        console.error('Error loading form config:', error);
      }
    );
  }

  toggleDebugMode(): void {
    this.debugMode = !this.debugMode;
  }
}