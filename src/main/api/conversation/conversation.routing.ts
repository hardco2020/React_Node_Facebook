import { RouteBase } from '../../../bases/route.base';
import { ConversationController } from './conversation.controller';
import express from 'express'

export class ConversationRoute extends RouteBase{
    protected controller!: ConversationController;
    constructor(){
        super();
    }
    protected initial(): void {
        this.controller = new ConversationController(); //UserContorller
        super.initial();
    }
    protected registerRoute(): void {    
        this.router.get('/test', (req, res, next) => res.send('user test.'));
        //create new conversation
        this.router.route('/')
        .post(
            express.json(),
            this.responseHandler(this.controller.createConversation)
        )
        //get conversation of a user
        this.router.route('/:userId')
        .get(
            this.responseHandler(this.controller.getConversation)
        )
        //get conversation by two userId
        this.router.route('/find/:firstUserId/:secondUserId')
        .get(
            this.responseHandler(this.controller.getConversationByTwoId)
        )
    }


}