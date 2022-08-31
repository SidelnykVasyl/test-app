import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOfQuestionsRoutingModule } from './list-of-questions-routing.module';
import { ListOfQuestionsComponent } from './list-of-questions/list-of-questions.component';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionPipe } from 'src/app/pipes/question.pipe';


@NgModule({
  declarations: [
    ListOfQuestionsComponent,
    AnswerCardComponent,
    QuestionPipe
  ],
  imports: [
    CommonModule,
    ListOfQuestionsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ListOfQuestionsModule { }
