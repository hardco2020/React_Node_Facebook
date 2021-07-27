
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

    public async timelinePost(user_id:string){
        const currentUser:any = await LocalAuthModel.findById(user_id)
        console.log(currentUser)
        const userPosts = await PostModel.find({userId:user_id});
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId:any)=>{
                console.log("朋友",friendId)
                return PostModel.find({userId:friendId})
            })
        )
        console.log(friendPosts.length)
        let posts:any
        if(friendPosts[0]===undefined){
            //console.log(friendPosts[0])
            posts = userPosts
        }else{
            for(let i=0;i<friendPosts.length; i++)
            //console.log(friendPosts[0])
            //console.log("不為空的")
            posts = (userPosts as unknown[]).concat(friendPosts[i])
        }
        return posts;
    }
    public async getUserbyUsername(user_name:string){
        console.log(user_name)
        const user = await LocalAuthModel.findOne({username:user_name})
        console.log(user)
        return user;
    }   
    public async getAllPost(user_id:string){
        const posts = await PostModel.find({userId:user_id})
        return posts;
    }
}