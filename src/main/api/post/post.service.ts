
import { PostDocument } from "models/post.model";
import { PostRepository} from "../../../repositories/post.repository"
import { HttpStatus } from '../../../types/response.type';



export class PostService {
    private readonly postRepo = new PostRepository();

    public async createPost(id:string,body:any){
        const post = await this.postRepo.createPost(id,body);
        return post;
    }
    public async updatePost(poster_id:string,post_id:string,body:any){
        //確認poster_id和post_id的主人有沒有一樣
        let res:any = ""
        let post = await this.postRepo.getPost(post_id) 
        if(post.userId == poster_id){ 
            res = await this.postRepo.updatePost(post_id,body)
        }else{//不能update throw error
            const error = new Error('您只能編輯自己的貼文！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        return res;
    }
    public async deletePost(poster_id:string,post_id:string){
        let res:any = ""
        const post = await this.postRepo.getPost(post_id) 
        if(post.userId == poster_id){ 
            res = await this.postRepo.deletePost(post_id)
        }else{//不能update throw error
            const error = new Error('您只能刪除自己的貼文！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        return res;
    }
    public async likePost(payload_id:string,post_id:string){
        let res:any =""
        const post = await this.postRepo.getPost(post_id);
        if(!post.likes.includes(payload_id)){
            res = await this.postRepo.likePost(payload_id,post_id)
        }else{
            res = await this.postRepo.dislikePost(payload_id,post_id)
        }
        return res;
    }
    public async getPost(id:string){
        const post = await this.postRepo.getPost(id);
        return post;
    }
    public async timelinePost(user_id:string,page:number){
        const posts = await this.postRepo.timelinePost(user_id,page);
        return posts;
    }
    public async getUserbyUsername(user_name:string){
        const user = await this.postRepo.getUserbyUsername(user_name);
        return user
    }
    public async getAllPost(user_id:string,page:number){
        const posts = await this.postRepo.getAllPost(user_id,page);
        return posts      
    }
    public async commentPost(user_name:string,user_pic:string,comment:string,date:Date,postId:string){
        const post = await this.postRepo.commentPost(user_name,user_pic,comment,date,postId)
        return post
    }
}