import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/app/interfaces/question.model';
import { QuestionManagementService } from '../../../services/question/question-management.service';

@Component({
  selector: 'app-list-of-questions',
  templateUrl: './list-of-questions.component.html',
  styleUrls: ['./list-of-questions.component.css']
})
export class ListOfQuestionsComponent implements OnInit, OnDestroy {
  answered$!: Observable<Question[]>;
  unanswered$!: Observable<Question[]>;
  private subscription!: Subscription;
  constructor(private questionService: QuestionManagementService) { }

  ngOnInit(): void {
    this.subscription = this.questionService.getQuestions().subscribe((questions: Question[]) => {
      let [answered, unanswered] = this.bifilter((x: Question) => x.isAnswered, questions);
      this.questionService.setAnswered(answered);
      this.questionService.setUnanswered(unanswered);

      this.answered$ = this.questionService.getAnsweredQuestions();
      this.unanswered$ = this.questionService.getUnansweredQuestions();
    })
  }

  public answerQuestion(question: Question): void {
    this.questionService.updateQuestions(question);
  }

  public rollBackAnswer(question: Partial<Question>): void {
    this.questionService.updateQuestions(question);
  }

  private bifilter = (condition: Function, array: Array<any>) => {
    return array.reduce(([T,F], x: Question, i: number, arr: Question[])=> {
      if (condition(x, i, arr) === false)
        return [T, [...F, x]]
      else
        return [[...T,x] , F]
    }, [[],[]])
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
