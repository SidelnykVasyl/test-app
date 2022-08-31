import { QuestionType } from "../enums/quetions-types.enum";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  date: number;
  answer: string[] | string;
  options: Array<string>
  isAnswered: boolean
}
