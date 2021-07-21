import { RouteBase } from '../../../bases/route.base';
import { TodoController } from './todo.controller';
import express from 'express'
export class TodoRoute extends RouteBase {
  protected controller!: TodoController; //不能沒有controller 使用！：
  constructor() {
    super();
  }
  protected initial(): void {
    this.controller = new TodoController();
    super.initial();
  }
  protected registerRoute(): void {    
    //新增 讀取
    this.router.get('/test', (req, res, next) => res.send('todo test.'));
    this.router.route('/')
    .get(
        this.responseHandler(this.controller.getTodos)
    )
    .post(
        express.json(),
        this.responseHandler(this.controller.addTodo)
    );
    //刪除 查詢
    this.router.route('/:id')
    .get(
        this.responseHandler(this.controller.getTodo)
    )
    .delete(
      this.responseHandler(this.controller.removeTodo)
    );
    //更新
    this.router.patch(
        '/:id/completed',
        express.json(),
        this.responseHandler(this.controller.completedTodo)
    );
  }

}