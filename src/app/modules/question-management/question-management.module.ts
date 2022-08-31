import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionManagementRoutingModule } from './question-management-routing.module';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { QuestionComponent } from './components/question/question.component';
import { QuestionManagementComponent } from './components/index/question-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';


@NgModule({
  declarations: [
    CreateQuestionComponent,
    QuestionComponent,
    QuestionManagementComponent,
    EditQuestionComponent,
    QuestionFormComponent
  ],
  imports: [
    CommonModule,
    QuestionManagementRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    QuestionComponent,
    CreateQuestionComponent
  ]
})
export class QuestionManagementModule { }
