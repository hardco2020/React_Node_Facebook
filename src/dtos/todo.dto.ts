import { ResponseDTOBase } from '../bases/dto.base';
import { TodoDocument } from '../models/todo.model';

export class ResponseTodoDTO extends ResponseDTOBase {

  public readonly _id : string;
  public readonly content!: string;
  public readonly completed!: boolean;
  public readonly date!:string;
  public readonly time!:string;
  constructor(doc: TodoDocument) { //理論上schema裡面要包含id
    super(doc);
    this._id = doc._id;
    this.content = doc.content;
    this.completed = doc.completed;
    this.date  =doc.date;
    this.time = doc.time;
  }

}