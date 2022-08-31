import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuestionComponent } from './components/create-question/create-question.component';
import { EditQuestionComponent } from './components/edit-question/edit-question.component';
import { QuestionManagementComponent } from './components/index/question-management.component';

const routes: Routes = [
  {
    path: '',
    component: QuestionManagementComponent,
  },
  {
    path: 'create',
    component: CreateQuestionComponent,
  },
  {
    path: 'edit/:id',
    component: EditQuestionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionManagementRoutingModule { }
