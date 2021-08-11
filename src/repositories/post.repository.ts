
import { PostDocument,PostModel} from '../models/post.model'
import { LocalAuthModel } from '../models/local-auth.model';

export class PostRepository{

    public async createPost(
        id:string,
        body:any,
    ):Promise<PostDocument>{
        //在此處做解構將id和body合在一起
        console.log(body)
        const { desc,img } = body //這樣的方式 解構沒有值就不會賦予
        //const data = [id,...body]
        const post = new PostModel(
            { 
                userId:id,
                desc, 
                img
            }
        );
        console.log(post)
        const document = await post.save();
        return document;
    }
    public async getPost(id:string):Promise<PostDocument>{
        const post:any = await PostModel.findById(id);
        return post;
    }
    public async updatePost(id:string,body:any){
        const post = await PostModel.findOneAndUpdate(
            {_id:id},
            {$set:body},
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        return post;
    }
    public async deletePost(id:string){
        const post = await PostModel.findOneAndDelete(
            {_id:id}
        );
        
        return post;
    }
    public async likePost(payload_id:string,post_id:string){
        const post = await PostModel.findOneAndUpdate(
            {_id:post_id},
            {$push:{likes:payload_id}},
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        return post 
    }
    public async dislikePost(payload_id:string,post_id:string){
        const post = await PostModel.findOneAndUpdate(
            {_id:post_id},
            {$pull:{likes:payload_id}},
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        return post
    }

    public async timelinePost(user_id:string,page:number){
        const currentUser:any = await LocalAuthModel.findById(user_id)
        console.log(currentUser)
        //兩個應該要合在一起找 這樣才能一次回傳十筆？
        const userPosts = await PostModel.find({userId:user_id});
        //利用解構寫法 一次回傳十筆？
        const friendPosts = await PostModel.find({userId:{$in: [user_id,...currentUser.friends]}}).sort([['createdAt', -1]]).limit(15).skip(page*15)
        //根據query回傳前十筆？
        return friendPosts;
    }
    public async getUserbyUsername(user_name:string){
        console.log(user_name)
        const user = await LocalAuthModel.findOne({username:user_name})
        console.log(user)
        return user;
    }   
    public async getAllPost(user_id:string,page:number){
        const posts = await PostModel.find({userId:user_id}).sort([['createdAt', -1]]).limit(15).skip(page*15)
        return posts;
    }
    public async commentPost(user_name:string,user_pic:string,comment:string,date:Date,postId:string){
        const Comment = { 
                userName: user_name,
                userPic:user_pic,
                comment:comment,
                date:date
        }
        const post = await PostModel.findOneAndUpdate(
            {_id:postId},
            {$push:{comment:Comment}},
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );
        return post;
    }
}