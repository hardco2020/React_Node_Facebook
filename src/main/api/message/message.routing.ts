import { RouteBase } from '../../../bases/route.base';
import { MessageController } from './message.controller';
import express from 'express'

export class MessageRoute extends RouteBase{
    protected controller!: MessageController;
    constructor(){
        super();
    }
    protected initial(): void {
        this.controller = new MessageController(); //UserContorller
        super.initial();
    }
    protected registerRoute(): void {    
        this.router.get('/test', (req, res, next) => res.send('user test.'));
        this.router.post('/testing', (req, res, next) => res.send('user test1234.'));
        //send message
        this.router.route('/')
        .post(
            express.json(),
            this.responseHandler(this.controller.sendMessage)
        )
        this.router.route('/:cvsId/:page')
        .get(
            this.responseHandler(this.controller.getMessage)
        )
    }


}