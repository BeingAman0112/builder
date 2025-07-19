import { Component, Input } from '@angular/core';
import { FormComponent, FormJson } from '../Model/formsModel';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-builder',
  standalone: false,
  templateUrl: '../Template/builder.html',
  styleUrl: '../Style/builder.css'
})
export class Builder {
  constructor(private fb: FormBuilder) {}
  formGroup!: FormGroup;
  ngOnInit() {
    this.formGroup = this.fb.group({});
    this.buildForm();
  }

   buildForm() {
    this.formJSON.components.forEach((section: any) => {
      if (section.elements && Array.isArray(section.elements)) {
        section.elements.forEach((component: FormComponent) => {
          if (component.type === 'text') {
            this.formGroup.addControl(
              component.attributes.field_name,
              this.fb.control('', component.attributes.is_required ? Validators.required : [])
            );
          }
          if (component.type === 'table-dynamic') {
            const formArray = this.fb.array([]);
            this.formGroup.addControl(component.attributes.field_name, formArray);

            // Optional: add one initial row
            this.addDynamicRow(component);
          }
          if (component.type === 'timespan') {
            this.formGroup.addControl('start_time', this.fb.control(''));
            this.formGroup.addControl('end_time', this.fb.control(''));
          }
        });
      }
    });
  }

  getValue(field: string) {
    return this.formGroup.get(field)?.value;
  }

  evaluateFormula(component: any): any {
  const formula = component.attributes.formula;
  const dependencies = component.attributes.dependencies || [];
  const values: Record<string, number> = {};

  dependencies.forEach((dep:any) => {
    const val = this.formGroup.get(dep)?.value;
    values[dep] = +val || 0; // fallback to 0
  });

  try {
    // Create a function like: new Function('amount', 'quantity', 'return amount * quantity')
    return new Function(...dependencies, `return ${formula}`)(...dependencies.map((dep:any) => values[dep]));
  } catch (err) {
    return '';
  }
}

addDynamicRow(component: any): void {
  const formArray = this.formGroup.get(component.attributes.field_name) as FormArray;
  const rowGroup = this.fb.group({});

  component.attributes.columns.forEach((col: string) => {
    rowGroup.addControl(col, this.fb.control(''));
  });

  formArray.push(rowGroup);
}
getFormArray(fieldName: string): FormArray {
  return this.formGroup.get(fieldName) as FormArray;
}

removeDynamicRow(fieldName: string, index: number): void {
  const formArray = this.formGroup.get(fieldName) as FormArray;
  formArray.removeAt(index);
}

getDuration(component: any): string | null {
  const start = this.formGroup.get(component.attributes.start_field)?.value;
  const end = this.formGroup.get(component.attributes.end_field)?.value;

  if (!start || !end) return null;

  const [startH, startM] = start.split(':').map(Number);
  const [endH, endM] = end.split(':').map(Number);

  let startMinutes = startH * 60 + startM;
  let endMinutes = endH * 60 + endM;

  // Handle cross-midnight scenario
  if (endMinutes < startMinutes) endMinutes += 24 * 60;

  const durationMinutes = endMinutes - startMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}h ${minutes}m`;
}





  formJSON: FormJson = {
    "auditHistory": {
    "userName": "aman",
    "formName": '',
    "location": "",
    "createdBy": "",
    "updatedBy": "",
    "createdDate": new Date(),
    "updatedDate": new Date(),
    "status": '',
    "userID": "",
  },
    "components": [
      {
        "title": "first Section",
        "canCollapsed": false,
        "isCollapsed": false,
        "repeatable": false,
        "elements":[
                {
        "type": "header",
        "attributes": {
          "text": "User Details",
          "level": 2,
          "style": {
            "fontSize": "24px",
            "fontWeight": "bold",
            "color": "#ab6604",
            "padding": "5px"
          }
        }
      },
      {
        "type": "text",
        "attributes": {
          "label": "Full Name",
          "field_name": "full_name",
          "is_required": true,
          "placeholder_text": "Enter full name",
          "style": {
            "border": "1px solid #ccc",
            "padding": "8px"
          },
          "actions": {
            "comment": true,
            "camera": false,
            "flag": false
          }
        }
      },
      {
        "type": "paragraph",
        "attributes": {
          "text": "Please fill in all required fields below. This form will be reviewed by our admin team.",
          "style": {
            "fontWeight": "bold",
            "fontStyle": "italic",
            "color": "#666"
          }
        }
      },
       {
    "type": "text",
    "attributes": {
      "label": "Amount",
      "field_name": "amount",
      "is_required": true,
      "placeholder_text": "Enter amount",
      "show_label": true,
      "style": {
        "padding": "6px",
        "border": "1px solid #ccc"
      },
      "actions": {
        "comment": false,
        "camera": false,
        "flag": false
      }
    }
  },
  {
		  "type": "auto_increment",
		  "attributes": {
			"label": "Serial No.",
			"field_name": "serial_number",
			"start": 1,
			"step": 1,
			"show_label": true,
			"is_required": false,
			"readOnly": true,
			"style": {
			  "fontWeight": "bold",
			  "color": "#333"
			}
		  }
		},
  {
    "type": "text",
    "attributes": {
      "label": "Quantity",
      "field_name": "quantity",
      "is_required": true,
      "placeholder_text": "Enter quantity",
      "show_label": true,
      "style": {
        "padding": "6px",
        "border": "1px solid #ccc"
      },
      "actions": {
        "comment": false,
        "camera": false,
        "flag": false
      }
    }
  },
  {
    "type": "calculated",
    "attributes": {
      "label": "Total Amount",
      "field_name": "total",
      "formula": "amount + quantity",
      "dependencies": ["amount", "quantity"],
      "style": {
        "color": "green"
      }
    }
  },
  {
    "type": "condition",
    "attributes": {
      "label": "Show Comments",
      "condition": {
        "field": "full_name",
        "operator": "!=",
        "value": ""
      },
      "children": [
        {
          "type": "textarea",
          "attributes": {
            "label": "Comments",
            "field_name": "comments",
            "is_required": false,
            "placeholder_text": "Write your comment",
            "show_label": true,
            "actions": {
              "comment": false,
              "camera": false,
              "flag": false
            }
          }
        }
      ]
    }
  },
  {
    "type": "repeater",
    "attributes": {
      "label": "Add Team Members",
      "field_name": "team_members",
      "template": {
        "type": "group",
        "elements": [
          {
            "type": "text",
            "attributes": {
              "label": "Name",
              "field_name": "name",
              "is_required": false,
              "placeholder_text": "Enter name",
              "show_label": true,
              "actions": {
                "comment": false,
                "camera": false,
                "flag": false
              }
            }
          },
          {
            "type": "text",
            "attributes": {
              "label": "Role",
              "field_name": "role",
              "is_required": false,
              "placeholder_text": "Enter role",
              "show_label": true,
              "actions": {
                "comment": false,
                "camera": false,
                "flag": false
              }
            }
          }
        ]
      }
    }
  },
      {
        "type": "table-static",
        "attributes": {
          "label": "Fixed Items Table",
          "columns": ["Item", "Quantity", "Rate"],
          "rows": [
            ["Pen", "10", "5"],
            ["Notebook", "5", "20"]
          ]
        }
      },
      {
        "type": "pagebreak",
        "attributes": {}
      },
      {
        "type": "table-dynamic",
        "attributes": {
          "label": "Expense Table",
          "field_name": "expenses",
          "columns": ["Description", "Amount"],
          "addRowText": "Add Expense"
        }
      },
      {
        "type": "timespan",
        "attributes": {
          "label": "Enter Your Work Duration",
          "field_name": "work_time",
          "start_field": "start_time",
          "end_field": "end_time",
           "style": {
            "color": "blue",
            "fontWeight": "bold"

          }
        }
      },
      {
        "type": "lock",
        "attributes": {
          "label": "Admin Note",
          "field_name": "admin_note",
          "value": "This section is locked.",
          "readOnly": true
        }
      },
      {
        "type": "pagebreak",
        "attributes": {}
      }
        ]
      }
    ]
  }

  onSubmit(){
    console.log(this.formGroup.value);
  }
}
