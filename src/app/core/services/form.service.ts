import { Injectable } from '@angular/core';
import { FormConfig } from '../models/form.models';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private formConfigs: FormConfig[] = [
    // First Form Configuration - User Registration Form
    {
      id: 'form1',
      name: 'User Registration Form',
      schema: {
        type: 'object',
        properties: {
          personalInfo: {
            type: 'object',
            properties: {
              firstName: {
                type: 'string',
                minLength: 2,
                maxLength: 50
              },
              lastName: {
                type: 'string',
                minLength: 2,
                maxLength: 50
              },
              email: {
                type: 'string',
                format: 'email'
              },
              phone: {
                type: 'string',
                pattern: '^[0-9]{10}$'
              },
              dateOfBirth: {
                type: 'string',
                format: 'date'
              },
              gender: {
                type: 'string',
                enum: ['male', 'female', 'other', 'preferNotToSay']
              }
            },
            required: ['firstName', 'lastName', 'email']
          },
          addressInfo: {
            type: 'object',
            properties: {
              street: {
                type: 'string'
              },
              city: {
                type: 'string'
              },
              state: {
                type: 'string',
                enum: ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY']
              },
              zipCode: {
                type: 'string',
                pattern: '^[0-9]{5}(?:-[0-9]{4})?$'
              },
              country: {
                type: 'string',
                enum: ['USA', 'Canada', 'Mexico', 'Other']
              }
            }
          },
          accountInfo: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                minLength: 5,
                maxLength: 20
              },
              password: {
                type: 'string',
                minLength: 8
              },
              confirmPassword: {
                type: 'string',
                minLength: 8
              },
              agreeToTerms: {
                type: 'boolean'
              }
            },
            required: ['username', 'password', 'confirmPassword', 'agreeToTerms']
          }
        },
        required: ['personalInfo', 'accountInfo']
      },
      uiSchema: {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Group',
            label: 'Personal Information',
            elements: [
              {
                type: 'HorizontalLayout',
                elements: [
                  {
                    type: 'Control',
                    scope: '#/properties/personalInfo/properties/firstName',
                    label: 'First Name'
                  },
                  {
                    type: 'Control',
                    scope: '#/properties/personalInfo/properties/lastName',
                    label: 'Last Name'
                  }
                ]
              },
              {
                type: 'Control',
                scope: '#/properties/personalInfo/properties/email',
                label: 'Email'
              },
              {
                type: 'Control',
                scope: '#/properties/personalInfo/properties/phone',
                label: 'Phone'
              },
              {
                type: 'Control',
                scope: '#/properties/personalInfo/properties/dateOfBirth',
                label: 'Date of Birth'
              },
              {
                type: 'Control',
                scope: '#/properties/personalInfo/properties/gender',
                label: 'Gender'
              }
            ]
          },
          {
            type: 'Group',
            label: 'Address Information',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/addressInfo/properties/street',
                label: 'Street'
              },
              {
                type: 'HorizontalLayout',
                elements: [
                  {
                    type: 'Control',
                    scope: '#/properties/addressInfo/properties/city',
                    label: 'City'
                  },
                  {
                    type: 'Control',
                    scope: '#/properties/addressInfo/properties/state',
                    label: 'State'
                  },
                  {
                    type: 'Control',
                    scope: '#/properties/addressInfo/properties/zipCode',
                    label: 'Zip Code'
                  }
                ]
              },
              {
                type: 'Control',
                scope: '#/properties/addressInfo/properties/country',
                label: 'Country'
              }
            ]
          },
          {
            type: 'Group',
            label: 'Account Information',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/accountInfo/properties/username',
                label: 'Username'
              },
              {
                type: 'Control',
                scope: '#/properties/accountInfo/properties/password',
                label: 'Password',
                options: {
                  format: 'password'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/accountInfo/properties/confirmPassword',
                label: 'Confirm Password',
                options: {
                  format: 'password'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/accountInfo/properties/agreeToTerms',
                label: 'I agree to the Terms and Conditions'
              }
            ]
          }
        ]
      },
      data: {
        personalInfo: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          dateOfBirth: '',
          gender: ''
        },
        addressInfo: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA'
        },
        accountInfo: {
          username: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        }
      }
    },
    
    // Second Form Configuration - Product Survey Form
    {
      id: 'form2',
      name: 'Product Survey Form',
      schema: {
        type: 'object',
        properties: {
          userProfile: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              email: {
                type: 'string',
                format: 'email'
              },
              age: {
                type: 'integer',
                minimum: 18,
                maximum: 120
              },
              occupation: {
                type: 'string'
              }
            },
            required: ['name', 'email']
          },
          productUsage: {
            type: 'object',
            properties: {
              useFrequency: {
                type: 'string',
                enum: ['daily', 'weekly', 'monthly', 'rarely', 'never']
              },
              purchaseDate: {
                type: 'string',
                format: 'date'
              },
              usageContext: {
                type: 'array',
                items: {
                  type: 'string',
                  enum: ['home', 'work', 'travel', 'education', 'entertainment', 'other']
                },
                uniqueItems: true
              },
              otherUsageContext: {
                type: 'string'
              }
            },
            required: ['useFrequency']
          },
          feedbackSection: {
            type: 'object',
            properties: {
              satisfaction: {
                type: 'integer',
                minimum: 1,
                maximum: 5
              },
              likedFeatures: {
                type: 'array',
                items: {
                  type: 'string'
                }
              },
              improvements: {
                type: 'string'
              },
              recommendLikelihood: {
                type: 'integer',
                minimum: 0,
                maximum: 10
              },
              comments: {
                type: 'string'
              }
            },
            required: ['satisfaction', 'recommendLikelihood']
          }
        },
        required: ['userProfile', 'productUsage', 'feedbackSection']
      },
      uiSchema: {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Group',
            label: 'User Profile',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/userProfile/properties/name',
                label: 'Full Name'
              },
              {
                type: 'Control',
                scope: '#/properties/userProfile/properties/email',
                label: 'Email Address'
              },
              {
                type: 'Control',
                scope: '#/properties/userProfile/properties/age',
                label: 'Age'
              },
              {
                type: 'Control',
                scope: '#/properties/userProfile/properties/occupation',
                label: 'Occupation'
              }
            ]
          },
          {
            type: 'Group',
            label: 'Product Usage',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/productUsage/properties/useFrequency',
                label: 'How often do you use our product?'
              },
              {
                type: 'Control',
                scope: '#/properties/productUsage/properties/purchaseDate',
                label: 'When did you purchase our product?'
              },
              {
                type: 'Control',
                scope: '#/properties/productUsage/properties/usageContext',
                label: 'In what context do you use our product?',
                options: {
                  format: 'checkbox'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/productUsage/properties/otherUsageContext',
                label: 'Other usage context (please specify)',
                rule: {
                  effect: 'SHOW',
                  condition: {
                    scope: '#/properties/productUsage/properties/usageContext',
                    schema: { 
                      contains: { const: 'other' } 
                    }
                  }
                }
              }
            ]
          },
          {
            type: 'Group',
            label: 'Feedback',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/feedbackSection/properties/satisfaction',
                label: 'Overall satisfaction (1-5)',
                options: {
                  format: 'rating'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/feedbackSection/properties/likedFeatures',
                label: 'What features do you like most?',
                options: {
                  multi: true
                }
              },
              {
                type: 'Control',
                scope: '#/properties/feedbackSection/properties/improvements',
                label: 'What improvements would you suggest?',
                options: {
                  multi: true,
                  format: 'textarea'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/feedbackSection/properties/recommendLikelihood',
                label: 'How likely are you to recommend our product? (0-10)',
                options: {
                  format: 'slider'
                }
              },
              {
                type: 'Control',
                scope: '#/properties/feedbackSection/properties/comments',
                label: 'Additional Comments',
                options: {
                  format: 'textarea'
                }
              }
            ]
          }
        ]
      },
      data: {
        userProfile: {
          name: '',
          email: '',
          age: 30,
          occupation: ''
        },
        productUsage: {
          useFrequency: '',
          purchaseDate: '',
          usageContext: [],
          otherUsageContext: ''
        },
        feedbackSection: {
          satisfaction: 3,
          likedFeatures: [],
          improvements: '',
          recommendLikelihood: 5,
          comments: ''
        }
      }
    }
  ];

  private currentFormConfigSubject = new BehaviorSubject<FormConfig | null>(null);
  currentFormConfig$ = this.currentFormConfigSubject.asObservable();

  constructor() { }

  getFormConfigById(id: string): Observable<FormConfig | undefined> {
    const formConfig = this.formConfigs.find(config => config.id === id);
    return of(formConfig);
  }

  getAllFormConfigs(): Observable<FormConfig[]> {
    return of(this.formConfigs);
  }

  setCurrentFormConfig(formConfig: FormConfig): void {
    this.currentFormConfigSubject.next(formConfig);
  }

  saveFormData(formId: string, data: any): Observable<boolean> {
    const formIndex = this.formConfigs.findIndex(config => config.id === formId);
    if (formIndex !== -1) {
      this.formConfigs[formIndex].data = data;
      return of(true);
    }
    return of(false);
  }
}