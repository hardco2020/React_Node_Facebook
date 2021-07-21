import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { Request, Response, NextFunction } from 'express';
import { ControllerBase } from '../../../bases/controller.base';
import { ResponseObject } from '../../../common/response/response.object';
import { HttpStatus } from '../../../types/response.type';
import { TodoService } from './todo.service'
import { ResponseTodoDTO } from 'dtos/todo.dto';
export class TodoController extends ControllerBase {
  //寫一個async 
  //將寫法簡易 因為沒有要resolve東西？
  //Promise<void> 返回一个Promise resolve值类型为void
  private readonly todoSvc = new TodoService();

    public async getTodos(req: Request): Promise<ResponseObject<ResponseTodoDTO[]>> {
        const { limit, skip } = req.query;
        const payload = new JWTPayloadDTO((req as any).payload); //此處用法到底是怎麼使用
        const dtos = await this.todoSvc.getTodos(payload,Number(limit), Number(skip));
        return this.formatResponse(dtos, HttpStatus.OK);
    }

    public async getTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>> {
        const { id } = req.params;
        const payload = new JWTPayloadDTO((req as any).payload); //payload裡有id跟username的屬性 將req當作payload來看
        const dto = await this.todoSvc.getTodo(payload,id);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async addTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>>  {
        const { content,time,date } = req.body;
        const payload = new JWTPayloadDTO((req as any).payload); //payload裡有id跟username的屬性 將req當作payload來看
        //console.log(payload)
        const dto = await this.todoSvc.addTodo(payload,content,time,date);
        return this.formatResponse(dto, HttpStatus.CREATED);
    }

    public async completedTodo(req: Request): Promise<ResponseObject<ResponseTodoDTO>>  {
        const { id } = req.params;
        const { completed } = req.body;
        const payload = new JWTPayloadDTO((req as any).payload);
        const dto = await this.todoSvc.completedTodo(payload,id, completed);
        if ( !dto ) {
            return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async removeTodo(req: Request): Promise<ResponseObject<null>>  {
        const { id } = req.params;
        const payload = new JWTPayloadDTO((req as any).payload);
        console.log(payload)
        const dto = await this.todoSvc.removeTodo(payload,id);
        if ( !dto ) {
        return this.formatResponse('Not found.', HttpStatus.NOT_FOUND);
        }
        return this.formatResponse(null, HttpStatus.NO_CONTENT);
    }
}
