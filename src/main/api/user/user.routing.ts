import { RouteBase } from '../../../bases/route.base';
import { UserController } from './user.controller';
import express from 'express'


export class UserRoute extends RouteBase{
    protected controller!: UserController; //不能沒有controller 使用！：
    constructor() {
        super();
    }
    protected initial(): void {
        this.controller = new UserController(); //UserContorller
        super.initial();
    }
    protected registerRoute(): void {    
        this.router.get('/test', (req, res, next) => res.send('user test.'));

//update user information
        this.router.route('/')
        .put(
            express.json(), //能夠解析body parser
            this.responseHandler(this.controller.updateUser)
        )
        .get(
            this.responseHandler(this.controller.getUser)
        )
//get specefic user  by id 
        // this.router.route('/:id')
        // .get(
        //     this.responseHandler(this.controller.getUser)
        // )
    
// follow a user
        this.router.route('/:id/follow')
        .put(
            this.responseHandler(this.controller.followUser)
        )
    
// unfollow a user 
        this.router.route('/:id/unfollow')
        .put(
            this.responseHandler(this.controller.unfollowUser)
        )
// get friends 
        this. router.route('/friends/:id')
        .get(
            this.responseHandler(this.controller.getFriends)
        )
// search users
        this.router.route('/search/:key')
        .get(
            this.responseHandler(this.controller.searchUsers)
        )
// get recommended ten users
        this.router.route('/recommend')
        .get(
            this.responseHandler(this.controller.recommendUsers)
        )
    }
}