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
    public async followUser(payload: JWTPayloadDTO,id:string){
        //在此處處理驗證的邏輯
        //自己不能追蹤自己
        //追蹤的人不能已經被追蹤過
        let user=""
        const isFollow = await this.localAuthRepo.getUserbyId(payload._id);
        console.log(isFollow)
        if(isFollow.followings.includes(id)){
            const error = new Error('您已經追蹤過此人！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        else if(payload._id==id){
            const error = new Error('自己不能追蹤自己！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }else{
            //做update
            await this.localAuthRepo.followUser(payload._id,id);
            user = "您已經成功追蹤"+id
        }
        return user;
    }
    public async unfollowUser(payload: JWTPayloadDTO,id:string){
        //在此處處理驗證的邏輯
        //自己不能追蹤自己
        //追蹤的人不能已經被追蹤過
        let user=""
        const isFollow = await this.localAuthRepo.getUserbyId(payload._id);
        console.log(isFollow)
        if(!isFollow.followings.includes(id)){ //代表找不到此人
            const error = new Error('您沒有追蹤此人！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        else if(payload._id==id){
            const error = new Error('自己不能取消追蹤自己！');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }else{
            //做update
            await this.localAuthRepo.unfollowUser(payload._id,id);
            user = "您已經成功取消追蹤"+id
        }
        return user;
    }
    public async getFriends(user_id:string){
        const user = await this.localAuthRepo.getUserbyId(user_id);
        const friends = await Promise.all(
            user.followings.map((friendsId: string)=>{
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