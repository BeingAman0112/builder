export interface FormJson {
   id?: string;
  auditHistory: {
    userName?: string;
    formName?: string;
    location?: string;
    createdBy?: string;
    updatedBy?: string;
    createdDate?: Date;
    updatedDate?: Date;
    status?: string;
    userID?: string;
  };
  components: FormSection[];
  formConfig?: FormConfiguration;
}

export interface FormSection {
  title: string;
  canCollapsed?: boolean;
  isCollapsed?: boolean;
  repeatable?: boolean;
  elements: FormComponent[];
}

export interface FormConfiguration {
  databaseName?: string;
  saveMethod?: 'stored_procedure' | 'rest_api';
  storedProcedure?: string;
  spParameters?: {
    [spParamName: string]: string; // e.g., { "sp_user_name": "full_name" }
  };
  apiEndpoint?: string;
}

export type FormComponent =
  | HeaderComponent
  | ParagraphComponent
  | TextComponent
  | TextareaComponent
  | SelectComponent
  | FileComponent
  | DateComponent
  | SignatureComponent
  | MapComponent
  | QRScannerComponent
  | LinkComponent
  | CalculatedComponent
  | ConditionComponent
  | RepeaterComponent
  | TableStaticComponent
  | TableDynamicComponent
  | TimeSpanComponent
  | LockComponent
  | PageBreakComponent
  | AutoIncrementComponent;


export interface BaseComponent {
  type: string;
  multiselect?: boolean;
  attributes?: any;
}

export interface Style {
  [key: string]: string;
}

export interface ActionFlags {
  comment?: boolean;
  camera?: boolean;
  flag?: boolean;
}

export interface ValidationRules {
  pattern?: string;
  minLength?: string;
  maxLength?: string;
  minDate?: string;
  maxDate?: string;
  maxSize?: string;
}


export interface HeaderComponent extends BaseComponent {
  type: 'header';
  attributes: {
    text?: string;
    level?: number;
    style?: Style;
  };
}

export interface ParagraphComponent extends BaseComponent {
  type: 'paragraph';
  attributes: {
    text: string;
    style?: Style;
  };
}

export interface TextComponent extends BaseComponent {
  type: 'text';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    placeholder_text?: string;
    show_label?: boolean;
    default_value?: string;
    validations?: ValidationRules;
    style?: Style;
    actions?: ActionFlags;
  };
}

export interface TextareaComponent extends BaseComponent {
  type: 'textarea';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    placeholder_text?: string;
    show_label?: boolean;
    default_value?: string;
    validations?: ValidationRules;
    style?: Style;
    actions?: ActionFlags;
  };
}


export interface SelectComponent extends BaseComponent {
  type: 'Select';
  multiselect: boolean;
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    placeholder_text?: string;
    show_label?: boolean;
    dataListId: string;
    actions?: ActionFlags;
  };
}

export interface FileComponent extends BaseComponent {
  type: 'file';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    show_label?: boolean;
    placeholder_text?: string;
    validations?: ValidationRules;
    actions?: ActionFlags;
  };
}

export interface DateComponent extends BaseComponent {
  type: 'date';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    show_label?: boolean;
    validations?: ValidationRules;
    actions?: ActionFlags;
  };
}

export interface imageComponent extends BaseComponent {
  type: 'image';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    show_label?: boolean;
    image_url?: string;
    validations?: any;
    actions?: ActionFlags;
  };
}

export interface SignatureComponent extends BaseComponent {
  type: 'signature';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    show_label?: boolean;
    pen_color?: string;
    actions?: ActionFlags;
  };
}

export interface MapComponent extends BaseComponent {
  type: 'map';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    show_label?: boolean;
    default_lat?: number;
    default_lng?: number;
    actions?: ActionFlags;
  };
}

export interface QRScannerComponent extends BaseComponent {
  type: 'qrscanner';
  attributes: {
    label: string;
    field_name: string;
    is_required: boolean;
    show_label?: boolean;
    actions?: ActionFlags;
  };
}

export interface LinkComponent extends BaseComponent {
  type: 'link';
  attributes: {
    label: string;
    url: string;
    link_text: string;
    show_label?: boolean;
    is_required?: boolean;
    actions?: ActionFlags;
  };
}


export interface CalculatedComponent extends BaseComponent {
  type: 'calculated';
  attributes: {
    label: string;
    field_name: string;
    formula: string;
    dependencies: string[];
    style?: Style;
  };
}


export interface ConditionComponent extends BaseComponent {
  type: 'condition';
  attributes: {
    label?: string;
    condition: {
      field: string;
      operator: '==' | '!=' | '>' | '<' | '>=' | '<=';
      value: any;
    };
    children: FormComponent[];
  };
}

export interface AutoIncrementComponent extends BaseComponent {
  type: 'auto_increment';
  attributes: {
    label: string;
    field_name: string;
    start: number;
    step: number;
    show_label?: boolean;
    is_required?: boolean;
    readOnly?: boolean;
    style?: Style;
  };
}


export interface RepeaterComponent extends BaseComponent {
  type: 'repeater';
  attributes: {
    label: string;
    field_name: string;
    template: {
      type: 'group';
      elements: FormComponent[];
    };
  };
}


export interface TableStaticComponent extends BaseComponent {
  type: 'table-static';
  attributes: {
    label: string;
    columns: string[];
    rows: string[][];
  };
}


export interface TableDynamicComponent extends BaseComponent {
  type: 'table-dynamic';
  attributes: {
    label: string;
    field_name: string;
    columns: string[];
    addRowText?: string;
  };
}

export interface TimeSpanComponent extends BaseComponent {
  type: 'timespan';
  attributes: {
    label: string;
    field_name: string;
    start_field: string;
    end_field: string;
    style?: Style;
  };
}


export interface LockComponent extends BaseComponent {
  type: 'lock';
  attributes: {
    label: string;
    field_name: string;
    value: string;
    readOnly: boolean;
  };
}

export interface PageBreakComponent extends BaseComponent {
  type: 'pagebreak';
  attributes?: {}; // No attributes
}

