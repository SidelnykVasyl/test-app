import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from 'src/app/enums/quetions-types.enum';
import { Question } from 'src/app/interfaces/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @Input() question!: Question;
  @Input() buttonName!: string;
  @Output() onSubmitEvent: EventEmitter<Partial<Question>> = new EventEmitter<Partial<Question>>;
  public form!: FormGroup;
  public questionType = QuestionType;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.setOptionsValidators();
    this.setFormValue();
  }

  get options() : FormArray {
    return this.form.get("options") as FormArray
  }

  get type() : FormControl {
    return this.form.get("type") as FormControl
  }

  get text() : FormControl {
    return this.form.get("text") as FormControl
  }

  public onSubmit(): void {
    this.onSubmitEvent.emit(this.form.value);
  }

  public addOption() {
    this.options.push(this.fb.control(''))
  }

  private initializeForm() {
    this.form = this.fb.group({
      text: ['', [Validators.required]],
      type: ['', [Validators.required]],
      options: this.fb.array([
        this.fb.control(''),
        this.fb.control(''),
      ])
    })
  }


  private setOptionsValidators() {
    this.type.valueChanges
      .subscribe((type: string) => {
        if (type !== QuestionType.OPEN) {
          this.options.controls.forEach((control) => control.setValidators(Validators.required))
          this.options.controls.forEach((control) => control.updateValueAndValidity())
        } else {
          this.options.controls.forEach((control) => control.setValidators(null))
          this.options.controls.forEach((control) => control.updateValueAndValidity())
        }
      });
  }

  private setFormValue(): void {
    if (this.question) {
      this.removeFormArray()

      this.text.setValue(this.question.text);
      this.type.setValue(this.question.type);

      this.question.options.forEach((option: string, i: number) => {
        this.options.push(new FormControl(''))
        this.options.controls[i].setValue(option);
        this.options.updateValueAndValidity()
      })
      this.form.controls['type'].markAsDirty();


    }
  }

  private removeFormArray(): void {
    while(this.options.length !== 0) {
      this.options.removeAt(0)
    }
  }

}
