import { RouteBase } from '../../../bases/route.base';
import { PostController } from './post.controller';
import express from 'express'

export class PostRoute extends RouteBase{
    protected controller!: PostController;
    constructor(){
        super();
    }
    protected initial(): void {
        this.controller = new PostController(); //UserContorller
        super.initial();
    }
    protected registerRoute(): void {    
        this.router.get('/test', (req, res, next) => res.send('user test.'));
        this.router.route('/')
        .post(
            express.json(), 
            this.responseHandler(this.controller.createPost)
        )
        //update post
        this.router.route('/:id')
        .put(
            express.json(),
            this.responseHandler(this.controller.updatePost)
        )
        //get a post by id
        .get(
            this.responseHandler(this.controller.getPost)
        )
        //delete post
        .delete(
            this.responseHandler(this.controller.deletePost)
        )
        //like a post (unlike)
        this.router.route('/:id/like')
        .put(
            this.responseHandler(this.controller.likePost)
        )
        //get timeline posts
        this.router.route('/timeline/all/:page')
        .get(
            this.responseHandler(this.controller.timelinePost)
        )
        //get user's all posts
        this.router.route('/profile/:username/:page')
        .get(
            this.responseHandler(this.controller.getAllPost)
        )
        //send Comments
        this.router.route('/comment/:postId')
        .post(
            express.json(),
            this.responseHandler(this.controller.sendComment)
        )
    }


}