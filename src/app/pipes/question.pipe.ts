import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'question'
})
export class QuestionPipe implements PipeTransform {

  transform(value: string | false | string[], answer: string): boolean {
    if (!value) {
      return false
    }

    return value.indexOf(answer) != -1;
  }

}
