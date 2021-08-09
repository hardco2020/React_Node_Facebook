import { RouteBase } from '../../../bases/route.base';
import { NoticeController } from './notice.controller';
import express from 'express'

export class NoticeRoute extends RouteBase{
    protected controller!: NoticeController;
    constructor(){
        super();
    }
    protected initial(): void {
        this.controller = new NoticeController(); //UserContorller
        super.initial();
    }
    protected registerRoute(): void {    
        this.router.get('/test', (req, res, next) => res.send('user test.'));
        //send Notice
        this.router.route('/')
        .post(
            express.json(),
            this.responseHandler(this.controller.sendNotice)
        )
        //get Notice
        this.router.route('/:id/:page')
        .get(
            this.responseHandler(this.controller.getNotice)
        )
        //send Notice type comment and like 
        this.router.route('/post')
        .post(
            express.json(),
            this.responseHandler(this.controller.sendNoticePost)
        )
        this.router.route('/update/:noticeId')
        .put(
            this.responseHandler(this.controller.updateNotice)
        )
        //delete Notice 
        this.router.route('/delete/:noticeId')
        .delete(
            this.responseHandler(this.controller.deleteNotice)
        )
    }


}