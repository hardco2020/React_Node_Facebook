import { RouteBase } from '../../../bases/route.base';
import { LocalAuthController } from './local-auth.controller';
import express from 'express'
import { TodoController } from 'main/api/todo/todo.controller';
import { LocalAuthSignupPipe } from './local-auth.pipe';
export class LocalAuthRoute extends RouteBase{
    protected controller!: LocalAuthController;
    constructor(){
        super();
    }
    protected initial():void{
        this.controller = new LocalAuthController();
        super.initial();
    }
    protected registerRoute():void{
        this.router.post('/signup',
            express.json(),
            this.usePipe(LocalAuthSignupPipe), //在這邊確認送出的資訊的表單驗證
            this.responseHandler(this.controller.signup)
        );
        this.router.post(
            '/signin',
            express.json(),
            this.responseHandler(this.controller.signin)
        );
    }
}