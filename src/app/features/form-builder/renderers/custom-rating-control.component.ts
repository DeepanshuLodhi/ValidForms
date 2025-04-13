import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { ControlElement } from '@jsonforms/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-rating-control',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="form-group">
      <label class="form-field-label" [for]="id">
        {{ label }}
        <span class="text-red-500" *ngIf="data === undefined">*</span>
      </label>

      <div class="flex items-center space-x-1">
        <ng-container *ngFor="let star of stars; let i = index">
          <button
            type="button"
            [id]="id + '-' + i"
            class="focus:outline-none"
            (click)="rate(i + 1)"
          >
            <svg
              class="w-8 h-8"
              [ngClass]="{
                'text-yellow-400': i < data,
                'text-gray-300': i >= data
              }"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              ></path>
            </svg>
          </button>
        </ng-container>
      </div>

      <div class="text-gray-600 mt-1 text-sm">
        <span *ngIf="data === 0">No rating</span>
        <span *ngIf="data === 1">Poor</span>
        <span *ngIf="data === 2">Fair</span>
        <span *ngIf="data === 3">Average</span>
        <span *ngIf="data === 4">Good</span>
        <span *ngIf="data === 5">Excellent</span>
      </div>
    </div>
  `
})
export class CustomRatingControlComponent extends JsonFormsControl {
  stars = Array(5).fill(0);

  constructor(jsonFormsService: JsonFormsAngularService) {
    super(jsonFormsService);
  }

  rate(value: number) {
    // Toggle the rating if clicking the same star
    const newValue = this.data === value ? 0 : value;
    this.onChange(newValue);
  }

  get controlElement(): ControlElement {
    return this.uischema as ControlElement;
  }
}