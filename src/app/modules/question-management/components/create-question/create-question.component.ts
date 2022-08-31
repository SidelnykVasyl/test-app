import { Component, OnInit } from '@angular/core';
import { QuestionManagementService } from '../../../../services/question/question-management.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { QuestionType } from 'src/app/enums/quetions-types.enum';
import { Question } from 'src/app/interfaces/question.model';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  public questionType = QuestionType;

  constructor(
    private questionService: QuestionManagementService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  public onSubmit(form: Partial<Question>): void {
    this.questionService.createQuestions({
      id: uuidv4(),
      date: Date.now(),
      isAnswered: false,
      ...form
    });
    this.router.navigate(['../'])
  }

}
