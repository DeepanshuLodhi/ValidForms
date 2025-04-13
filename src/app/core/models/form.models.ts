// Form schema defines the structure of the form data
export interface FormSchema {
  type: string;
  properties: Record<string, any>;
  required?: string[];
}

// UI schema defines how the form should be rendered
export interface UiSchema {
  type: string;
  elements: any[];
}

// Complete form configuration
export interface FormConfig {
  id: string;
  name: string;
  schema: FormSchema;
  uiSchema: UiSchema;
  data?: any;
}