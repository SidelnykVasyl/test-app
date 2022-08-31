import { Component, OnInit } from '@angular/core';
import { Observable, } from 'rxjs';
import { Question } from 'src/app/interfaces/question.model';
import { QuestionManagementService } from '../../../../services/question/question-management.service';

@Component({
  selector: 'app-question-management',
  templateUrl: './question-management.component.html',
  styleUrls: ['./question-management.component.scss']
})
export class QuestionManagementComponent implements OnInit {

  public questions$!: Observable<Question[]>;

  constructor(
    private questionService: QuestionManagementService,
    ) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  private getQuestions() {
    this.questions$ = this.questionService.getQuestions();
  }

  public onQuestionRemove(id: string): void {
    this.questionService.remove(id);
  }

}
