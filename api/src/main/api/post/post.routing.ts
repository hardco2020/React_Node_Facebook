import { RouteBase } from '../../../bases/route.base';
import { PostController } from './post.controller';
import multer from 'multer';
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
        //create post
        // const storage =  multer.diskStorage({
        //     destination:(req,file,cb)=>{
        //       cb(null,"public/images");
        //     },
        //     filename:(req,file,cb)=>{
        //       cb(null,file.originalname);
        //     }
        //   })
        // const upload = multer({storage});
        // this.router.route('/upload')
        // .post(
        //     upload.single('file')
        //     this.responseHandler()
        // )
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
        this.router.route('/timeline/all')
        .get(
            this.responseHandler(this.controller.timelinePost)
        )
        //get user's all posts
        this.router.route('/profile/:username')
        .get(
            this.responseHandler(this.controller.getAllPost)
        )
    }


}