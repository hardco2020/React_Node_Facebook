
import { ControllerBase } from '../../../bases/controller.base';
import { PostService } from './post.service';
import { Request, Response, NextFunction } from 'express';
import { PostDocument } from '../../../models/post.model';
import { ResponseObject } from 'common/response/response.object';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { HttpStatus } from '../../../types/response.type';


export class PostController extends ControllerBase {
    private readonly postSvc = new PostService();

    public async createPost(req:Request):Promise<ResponseObject<PostDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        //const {desc,img,} = req.body //考慮到不是每個欄位都必須 這邊先註解
        const dto = await this.postSvc.createPost(payload._id,req.body);//觸發service
        return this.formatResponse(dto, HttpStatus.CREATED);
    }   

    public async updatePost(req:Request):Promise<ResponseObject<PostDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const {id} = req.params //要修改的貼文id
        console.log(req.body)
        const dto =await this.postSvc.updatePost(payload._id,id,req.body)
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async deletePost(req:Request):Promise<ResponseObject<string>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const {id} = req.params //要修改的貼文id
        const dto =await this.postSvc.deletePost(payload._id,id)
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async likePost(req:Request):Promise<ResponseObject<string>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const{id} = req.params //貼文id
        const dto =await this.postSvc.likePost(payload._id,id)
        //const res = "點贊"+id
        return this.formatResponse(dto, HttpStatus.OK);
    }

    public async getPost(req:Request):Promise<ResponseObject<PostDocument>>{
        //const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const{id} = req.params //貼文id
        const dto = await this.postSvc.getPost(id)
        return this.formatResponse(dto,HttpStatus.OK);
    }
    
    public async timelinePost(req:Request):Promise<ResponseObject<PostDocument[]>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const page = parseInt(req.params.page)
        console.log(page)
        console.log(payload._id)
        const dto = await this.postSvc.timelinePost(payload._id,page)
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async getAllPost(req:Request):Promise<ResponseObject<PostDocument[]>>{
        const user_name = req.params.username
        const page = parseInt(req.params.page)
        console.log(user_name)
        console.log(page)
        const user:any = await this.postSvc.getUserbyUsername(user_name)
        const dto = await this.postSvc.getAllPost(user._id,page)
        return this.formatResponse(dto,HttpStatus.OK);
    }   
    public async sendComment(req:Request){
        const { postId } = req.params
        const {userName,userPic,comment,date} = req.body
        const dto =await this.postSvc.commentPost(userName,userPic,comment,date,postId)
        return this.formatResponse(dto, HttpStatus.OK);
    }
}