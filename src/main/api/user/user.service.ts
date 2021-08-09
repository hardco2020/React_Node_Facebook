import { LocalAuthRepository } from "../../../repositories/local-auth.repository";
import { HttpStatus } from '../../../types/response.type';

import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';



export class UserService {
    private readonly localAuthRepo = new LocalAuthRepository();

    public async updateUser(payload: JWTPayloadDTO , body:any){
        //此處應該要做service-Model層的邏輯
        const user =  await this.localAuthRepo.updateUser(payload._id,body);
        return user;
    }
    public async getUserbyId(id:string){
        const user = await this.localAuthRepo.getUserbyId(id)
        return user;
    }
    public async getUserbyUsername(user_name:string){
        const user = await this.localAuthRepo.getUserbyUsername(user_name)
        return user;
    }
    public async createPending(senderId:string,receiverId:string){
        const pending = await this.localAuthRepo.createPending(senderId,receiverId)
        return pending;
    }
    public async updatePending(senderId:string,receiverId:string){
        const pending = await this.localAuthRepo.updatePending(senderId,receiverId)
        return pending;
    }
    public async getPending(senderId:string,receiverId:string){
        const pending = await this.localAuthRepo.getPending(senderId,receiverId)
        return pending;
    }
    public async deletePending(senderId:string,receiverId:string){
        const pending = await this.localAuthRepo.deletePending(senderId,receiverId)
        return pending;
    }
    public async friendUser(id:string,friendId:string){
        let user=""
        const isFriend = await this.localAuthRepo.getUserbyId(id);
        console.log(isFriend)
        if(isFriend.friends.includes(friendId)){ //代表找不到此人
            const error = new Error('您和此人已經是朋友了！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        else if(id===friendId){
            const error = new Error('自己不能和自己當朋友！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }else{
            //做update
            await this.localAuthRepo.friendUser(id,friendId);
            user = "您已經成功和"+id+"成為朋友"
        }
        return user;
    }
    public async unfriendUser(id:string,friendId:string){
        let user=""
        const isFriend = await this.localAuthRepo.getUserbyId(id);
        console.log(isFriend)
        if(!isFriend.friends.includes(friendId)){ //代表找不到此人
            const error = new Error('您和此人不是朋友！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        else if(id===friendId){
            const error = new Error('自己不能和自己取消朋友！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }else{
            //做update
            await this.localAuthRepo.unfriendUser(id,friendId);
            user = "您已經成功和"+id+"取消朋友"
        }
        return user;
    }
    public async getFriends(user_id:string){
        const user = await this.localAuthRepo.getUserbyId(user_id);
        const friends = await Promise.all(
            user.friends.map((friendsId: string)=>{
                return this.localAuthRepo.getUserbyId(friendsId)
            })
        )
        let friendList: { _id: any; username: any; profilePicture: any; }[] = []
        friends.map((friend:any)=>{
            const { _id,username,profilePicture} = friend;
            friendList.push({_id,username,profilePicture});
        })
        return friendList
    }
    public async searchUsers(key:string){
        const users = this.localAuthRepo.searchUsers(key);
        return  users
    }
    public async recommendUsers(user_id:string){
        const users = this.localAuthRepo.recommendUsers(user_id);
        return users
    }
}