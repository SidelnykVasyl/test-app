import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'question-management', pathMatch: 'full' },
  {
    path: 'question-management',
    loadChildren: () => import('./modules/question-management/question-management.module')
      .then(mod => mod.QuestionManagementModule)
  },
  {
    path: 'list-of-questions',
    loadChildren: () => import('./modules/list-of-questions/list-of-questions.module')
      .then(mod => mod.ListOfQuestionsModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
