import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOfQuestionsComponent } from './list-of-questions/list-of-questions.component';

const routes: Routes = [
  {
    path: '',
    component: ListOfQuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListOfQuestionsRoutingModule { }
