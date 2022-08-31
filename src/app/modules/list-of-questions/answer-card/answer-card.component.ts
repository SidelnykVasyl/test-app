import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from 'src/app/enums/quetions-types.enum';
import { Question } from 'src/app/interfaces/question.model';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.css']
})
export class AnswerCardComponent implements OnInit {
  @Input() question!: Question;
  @Output() onAnswerEvent: EventEmitter<Question> = new EventEmitter<Question>()
  @Output() onRollbackEvent: EventEmitter<Partial<Question>> = new EventEmitter<Partial<Question>>()
  public form!: FormGroup;
  public questionType = QuestionType;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.fillForm();
  }

  get options() : FormArray {
    return this.form.get("options") as FormArray
  }

  get answer() : FormArray {
    return this.form.get("answer") as FormArray
  }

  public onCheckChange(event: any): void {
    if(event.target.checked){
      this.answer.push(new FormControl(event.target.value));
    }
    else{
      let i: number = 0;
      this.answer.controls.forEach((ctrl: AbstractControl) => {
        if(ctrl.value == event.target.value) {
          this.answer.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  public onAnswer(): void {
    this.onAnswerEvent.emit(
      {
        ...this.question,
        isAnswered: true,
        ...this.form.value
      }
    )
  }

  public rollBackAnswer(): void {
    this.onRollbackEvent.emit({
      ...this.question,
      isAnswered: false
    })
  }

  initForm(): void {
    this.form = this.fb.group({
      options: this.fb.array([]),
      answer: this.question.type === QuestionType.MULTIPLE_CHOICE
       ?  new FormArray([]) :
        this.question.isAnswered ? this.question.answer : [, [Validators.minLength(1), Validators.maxLength(255), Validators.required]]
    })
  }

  fillForm(): void {
    this.question.options.forEach((option: string) => {
      this.options.push(new FormControl(option))
    })
  }




}
