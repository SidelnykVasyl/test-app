import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Question } from 'src/app/interfaces/question.model';
import { LocalService } from 'src/app/services/local/local.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionManagementService {
  private QUESTION_KEY = 'questions'

  private questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  private answered$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  private unanswered$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

  constructor(private localService: LocalService) {
    this.init()
   }

  public getQuestions(): Observable<Question[]> {
    return this.questions$.pipe(
      map((el: Question[]) =>
        el.sort((a,b) => b.date - a.date)
      )
    )
  }

  public setAnswered(data: Question[]): void {
    this.answered$.next(data);
  }

  public setUnanswered(data: Question[]): void {
    this.unanswered$.next(data);
  }

  public getAnsweredQuestions(): Observable<Question[]> {
    return this.answered$.asObservable();
  }

  public getUnansweredQuestions(): Observable<Question[]> {
    return this.unanswered$.asObservable();
  }

  private setQuestions(key: string, questions: Question[]): void {
    this.questions$.next(questions);
    this.localService.saveData(key, questions)
  }

  private init(): void {
    const data = this.localService.getData(this.QUESTION_KEY);
    this.setQuestions(this.QUESTION_KEY, data || []);
  }

  public getById(id: string): Observable<Question> {
    let data = this.localService.getData(this.QUESTION_KEY);
    data = data.filter((el: Question) => el.id == id);
    return of(data[0]);
  }

  public remove(id: string): void {
    const data = this.localService.getData(this.QUESTION_KEY);
    const updatedData = data.filter((el: Question) => el.id !== id)
    this.setQuestions(this.QUESTION_KEY, updatedData)
  }

  public createQuestions(value: Partial<Question>): void {
    const data = this.localService.getData(this.QUESTION_KEY);
    data.push(value)

    this.setQuestions(this.QUESTION_KEY, data)
  }

  public updateQuestions(question: Partial<Question>): void {
    const data = this.localService.getData(this.QUESTION_KEY);
    const updatedData = data.map((el: Question) => {
      if (question.id === el.id) {
        return {
          ...question
        }
      }
      return el
    });
    this.setQuestions(this.QUESTION_KEY, updatedData)
  }


}
