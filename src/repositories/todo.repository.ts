import { TodoModel, TodoDocument } from '../models/todo.model';

export class TodoRepository {

  public async addTodo(userId: string, content: string,time:string,date:string): Promise<TodoDocument> {
    const todo = new TodoModel({ content, completed: false,time,date, owner: userId });
    const document = await todo.save();
    return document;
  }

  public async getTodo(userId: string, id: string): Promise<TodoDocument | null> {
    const todo = await TodoModel.findOne({ _id: id, owner: userId });
    return todo;
  }

  public async getTodos(
    userId: string,
    limit: number,
    skip: number
  ): Promise<TodoDocument[]> {
    const todos = await TodoModel.find({ owner: userId }).skip(skip).limit(limit);
    return todos;
  }

  public async completedTodo(userId: string, id: string, completed: boolean) {
    const todo = await TodoModel.findOneAndUpdate(
      { _id: id, owner: userId },
      { completed },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false
      }
    );
    return todo;
  }

  public async removeTodo(userId: string, id: string) {
    const todo = await TodoModel.findOneAndRemove({ _id: id, owner: userId });
    return todo;
  }

}