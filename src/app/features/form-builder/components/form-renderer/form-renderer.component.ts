import { Component, OnInit, Input } from '@angular/core';
import { FormConfig } from '../../../../core/models/form.models';
import { FormService } from '../../../../core/services/form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class FormRendererComponent implements OnInit {
  @Input() formConfig: FormConfig | null = null;
  
  formData: any = {
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    addressInfo: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'India',
      movingDate: '',
      previousState: '',
      movingReason: ''
    },
    accountInfo: {
      username: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false
    }
  };
  
  // States that will trigger the additional fields
  specialStates = ['MH', 'DL', 'KA', 'TN', 'TG'];
  showStateSpecificInfo = false;
  
  initialFormData: any = {};
  touched: {[key: string]: boolean} = {};
  validationErrors: {[field: string]: string} = {};
  formSubmitted = false;
  showDebug = false;
  
  constructor(private formService: FormService) {}

  ngOnInit(): void {
    if (this.formConfig && this.formConfig.data) {
      this.formData = JSON.parse(JSON.stringify(this.formConfig.data));
      this.initialFormData = JSON.parse(JSON.stringify(this.formConfig.data));
    } else {
      this.initialFormData = JSON.parse(JSON.stringify(this.formData));
    }
    
    // Check if the state is already set to one of the special states
    this.stateChanged();
  }

  isFormInvalid(): boolean {
    return !this.formData.personalInfo?.firstName || 
           !this.formData.personalInfo?.lastName || 
           !this.formData.personalInfo?.email || 
           !this.formData.accountInfo?.username || 
           !this.formData.accountInfo?.password || 
           !this.formData.accountInfo?.confirmPassword || 
           !this.formData.accountInfo?.agreeToTerms || 
           this.formData.accountInfo?.password !== this.formData.accountInfo?.confirmPassword;
  }

  // This method is called when the state dropdown changes
  stateChanged(): void {
    const state = this.formData.addressInfo.state;
    this.showStateSpecificInfo = this.specialStates.includes(state);
    
    // If we're no longer showing the special info, clear any values
    if (!this.showStateSpecificInfo) {
      this.formData.addressInfo.movingDate = '';
      this.formData.addressInfo.previousState = '';
      this.formData.addressInfo.movingReason = '';
    }
  }
  
  // Get a human-readable state name
  getStateName(stateCode: string): string {
    const stateNames: {[key: string]: string} = {
      'AP': 'Andhra Pradesh',
      'AR': 'Arunachal Pradesh',
      'AS': 'Assam',
      'BR': 'Bihar',
      'CG': 'Chhattisgarh',
      'GA': 'Goa',
      'GJ': 'Gujarat',
      'HR': 'Haryana',
      'HP': 'Himachal Pradesh',
      'JK': 'Jammu and Kashmir',
      'JH': 'Jharkhand',
      'KA': 'Karnataka',
      'KL': 'Kerala',
      'MP': 'Madhya Pradesh',
      'MH': 'Maharashtra',
      'MN': 'Manipur',
      'ML': 'Meghalaya',
      'MZ': 'Mizoram',
      'NL': 'Nagaland',
      'OD': 'Odisha',
      'PB': 'Punjab',
      'RJ': 'Rajasthan',
      'SK': 'Sikkim',
      'TN': 'Tamil Nadu',
      'TG': 'Telangana',
      'TR': 'Tripura',
      'UP': 'Uttar Pradesh',
      'UK': 'Uttarakhand',
      'WB': 'West Bengal',
      'DL': 'Delhi'
    };
    
    return stateNames[stateCode] || stateCode;
  }

  // Mark a field as touched when user interacts with it
  markAsTouched(field: string): void {
    this.touched[field] = true;
    this.validateField(field);
    
    // If this is a password field, also validate confirm password
    if (field === 'accountInfo.password' && this.touched['accountInfo.confirmPassword']) {
      this.validateField('accountInfo.confirmPassword');
    }
  }

  // Validate a specific field
  validateField(field: string): void {
    delete this.validationErrors[field];
    
    // Validate based on the field
    switch(field) {
      case 'personalInfo.firstName':
        if (!this.formData.personalInfo.firstName) {
          this.validationErrors[field] = 'First name is required';
        } else if (this.formData.personalInfo.firstName.length < 2) {
          this.validationErrors[field] = 'First name must be at least 2 characters';
        }
        break;
        
      case 'personalInfo.lastName':
        if (!this.formData.personalInfo.lastName) {
          this.validationErrors[field] = 'Last name is required';
        } else if (this.formData.personalInfo.lastName.length < 2) {
          this.validationErrors[field] = 'Last name must be at least 2 characters';
        }
        break;
        
      case 'personalInfo.email':
        if (!this.formData.personalInfo.email) {
          this.validationErrors[field] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.personalInfo.email)) {
          this.validationErrors[field] = 'Please enter a valid email address';
        }
        break;
        
      case 'personalInfo.phone':
        if (this.formData.personalInfo.phone && !/^\d{10}$/.test(this.formData.personalInfo.phone)) {
          this.validationErrors[field] = 'Phone number must be 10 digits';
        }
        break;
        
      case 'addressInfo.zipCode':
        if (this.formData.addressInfo.zipCode && !/^\d{6}$/.test(this.formData.addressInfo.zipCode)) {
          this.validationErrors[field] = 'PIN code must be 6 digits';
        }
        break;
        
      case 'accountInfo.username':
        if (!this.formData.accountInfo.username) {
          this.validationErrors[field] = 'Username is required';
        } else if (this.formData.accountInfo.username.length < 5) {
          this.validationErrors[field] = 'Username must be at least 5 characters';
        }
        break;
        
      case 'accountInfo.password':
        if (!this.formData.accountInfo.password) {
          this.validationErrors[field] = 'Password is required';
        } else if (this.formData.accountInfo.password.length < 8) {
          this.validationErrors[field] = 'Password must be at least 8 characters';
        }
        break;
        
      case 'accountInfo.confirmPassword':
        if (!this.formData.accountInfo.confirmPassword) {
          this.validationErrors[field] = 'Confirm password is required';
        } else if (this.formData.accountInfo.password !== this.formData.accountInfo.confirmPassword) {
          this.validationErrors[field] = 'Passwords do not match';
        }
        break;
    }
  }

  // Check if a field has an error and is touched
  hasError(field: string): boolean {
    return this.touched[field] && !!this.validationErrors[field];
  }

  // Get the error message for a field
  getErrorMessage(field: string): string {
    return this.validationErrors[field] || '';
  }

  resetForm(): void {
    // Use deep copy to ensure we're not keeping references
    this.formData = JSON.parse(JSON.stringify(this.initialFormData));
    this.touched = {};
    this.validationErrors = {};
    this.formSubmitted = false;
    
    // Check if the state is already set to one of the special states
    this.stateChanged();
  }

  submitForm(): void {
    // Mark all fields as touched
    ['personalInfo.firstName', 'personalInfo.lastName', 'personalInfo.email', 'personalInfo.phone',
     'addressInfo.zipCode', 'accountInfo.username', 'accountInfo.password', 'accountInfo.confirmPassword'].forEach(field => {
      this.touched[field] = true;
      this.validateField(field);
    });
    
    // Check if there are any validation errors
    if (Object.keys(this.validationErrors).length === 0 && !this.isFormInvalid()) {
      console.log('Form data submitted:', this.formData);
      
      if (this.formConfig) {
        this.formService.saveFormData(this.formConfig.id, this.formData)
          .subscribe(success => {
            if (success) {
              this.formSubmitted = true;
            }
          });
      }
    }
  }

  toggleDebug(): void {
    this.showDebug = !this.showDebug;
  }
}