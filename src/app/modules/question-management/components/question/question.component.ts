import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from 'src/app/interfaces/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question!: Question;
  @Output() onDeleteQuestion: EventEmitter<string> = new EventEmitter()

  public onDelete(question: Question): void {
    this.onDeleteQuestion.emit(question.id)
  }

}
