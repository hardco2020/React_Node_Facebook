import { TodoRepository } from '../../../repositories/todo.repository';

import { ResponseTodoDTO } from '../../../dtos/todo.dto';
import { DefaultQuery } from '../../../types/request.type';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';

export class TodoService {
  private readonly todoRepo = new TodoRepository();
  public async getTodos(
    payload: JWTPayloadDTO,
    limit: number = DefaultQuery.LIMIT,
    skip: number = DefaultQuery.SKIP
  ): Promise<ResponseTodoDTO[]> {
    const todos = await this.todoRepo.getTodos(
      payload._id,
      Math.min(limit, DefaultQuery.MAX_LIMIT),
      skip
    );
    const dtos = todos.map(todo => new ResponseTodoDTO(todo));
    return dtos;
  }

  public async getTodo(payload: JWTPayloadDTO , id: string): Promise<ResponseTodoDTO | null> {
    const todo = await this.todoRepo.getTodo(payload._id,id);
    const dto = todo ? new ResponseTodoDTO(todo) : null;
    return dto;
  }

  public async addTodo(payload: JWTPayloadDTO, content: string,time: string ,date:string): Promise<ResponseTodoDTO> {
    const document = await this.todoRepo.addTodo(payload._id,content,time,date);
    const dto = new ResponseTodoDTO(document);
    return dto;
  }

  public async completedTodo(payload: JWTPayloadDTO , id: string, completed: boolean): Promise<ResponseTodoDTO | null> {
    const todo = await this.todoRepo.completedTodo(payload._id,id, completed);
    const dto =  todo ? new ResponseTodoDTO(todo) : null;
    return dto;
  }

  public async removeTodo(payload: JWTPayloadDTO, id: string): Promise<ResponseTodoDTO | null> {
    const todo = await this.todoRepo.removeTodo(payload._id,id);
    const dto = todo ? new ResponseTodoDTO(todo) : null;
    return dto;
  }

}