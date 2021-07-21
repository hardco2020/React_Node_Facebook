import { RouteBase } from '../../bases/route.base';
import { TodoRoute } from './todo/todo.routing';
import { UserRoute } from './user/user.routing';
import { PostRoute } from './post/post.routing';
import JWT from 'express-jwt';
export class ApiRoute extends RouteBase {

  private todoRoute = new TodoRoute();
  private userRoute = new UserRoute();
  private postRoute = new PostRoute();
  constructor() {
    super();
    //this.first();
  }
  protected initial():void{
    this.todoRoute = new TodoRoute();
    this.userRoute = new UserRoute(); //初始化
    this.postRoute = new PostRoute();
    super.initial();
  }
  protected registerRoute(): void {
    //非會員不能使用 用guard擋住
    this.router.use(
        JWT( //需要驗證 如果驗證不通過 接到jwt exceptions
          {
            secret: (process.env.JWT_SIGN as string),//簽章用
            //secret: process.env.JWT_SIGN 這樣寫會錯 系統認不出jwt_sign是什麼型態
            userProperty: 'payload',//解碼過後要assign給的名稱  //使用者資訊屬性名稱
            algorithms: ['HS256']  //加密演算法
          }
        )
    );
    this.router.use('/todos', this.todoRoute.router);
    this.router.use('/users',this.userRoute.router);
    this.router.use('/posts',this.postRoute.router);
    //此處要新增user的route
  }

}