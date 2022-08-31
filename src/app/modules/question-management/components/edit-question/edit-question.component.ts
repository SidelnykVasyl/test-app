import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/interfaces/question.model';
import { QuestionManagementService } from '../../../../services/question/question-management.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit, OnDestroy {
  public id!: string;
  public question!: Question;
  private subscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionManagementService
  ) { }

  ngOnInit(): void {
    this.getCurrentQuestion()
  }

  public onSubmit(form: Partial<Question>): void {
    this.questionService.updateQuestions(
        {
          ...this.question,
          ...form
        }
      )
    this.router.navigate(['../'])
  }


  private getCurrentQuestion(): void {
    this.id = this.route.snapshot.params['id'];
    this.subscription = this.questionService.getById(this.id).subscribe((question: Question) => {
      this.question = question;
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
