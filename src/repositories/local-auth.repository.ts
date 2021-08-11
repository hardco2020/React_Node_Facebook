import { timeStamp } from 'console';
import crypto from 'crypto'; //加密方法
import {LocalAuthDocument,LocalAuthModel} from '../models/local-auth.model'
import { PendingnModel,PendingDocument } from '../models/pending.model';
export class LocalAuthRepository {
    //hash實作方法
    public hashPassword(
        password: string,
        salt = crypto.randomBytes(16).toString('hex') //原本是binary 要換成16進制？
      ): { salt: string, hash: string } {
          //生成鹽之後生成密碼
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
        return { salt, hash };
    }

    public async addUser(
        username:string,
        password:string,
        email:string
    ):Promise<LocalAuthDocument>{
        //要加入雜湊實作
        const { salt, hash } = this.hashPassword(password);
        const user = new LocalAuthModel({
            username,
            password:{salt,hash},
            email
        });
        console.log("123")
        const document = await user.save();
        return document;
    }
    
    public async getUser(
        options:any
        // options:{username?: string,email?: string} //? marks the member as being optional in the interface. 
    ): Promise<LocalAuthDocument|null>{
        console.log(options)
        const params = Object.keys(options.data) //user或email都可以
                   .filter(key => !!(options.data as any)[key]) //看有沒有存在此序列
                   .map(key => { //存在的話就將其兩者配對回傳
                     return { [key]: (options.data as any)[key] };
                   });
        console.log("看一下驗證get",params)
        const getCondition = () => {
            if ( params.length > 1 ) {
              return {
                $or: params
              };
            }
            return params[0];
        };
        const user = await LocalAuthModel.findOne(getCondition());
        return user;
    }
    //此處新增update user的選項
    public async updateUser(userId:string,body:any){
        console.log(body)
        const user = await LocalAuthModel.findOneAndUpdate(
            {_id:userId},
            { $set:body},
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }

        );
        return user;
    }
    //新增用id找到user的選項
    public async getUserbyId(id:string){
        const user:any = await LocalAuthModel.findById(id);
        const {password,updatedAt,...other} = user._doc //將敏感資訊去除掉
        //console.log(other)
        return other;
    }
    //新增用user_name找到user的選項
    public async getUserbyUsername(user_name:string){
        const user:any = await LocalAuthModel.findOne({username:user_name})
        if(!user){
            console.log("找不到使用者")
            return user;
        }else{
            const {password,updatedAt,...other} = user._doc //將敏感資訊去除掉
            console.log(other)
            return other;
        }
        //因為這邊用到user的doc導致註冊再做確認時找不到資訊會直接throw error
    }
    public async getUserbyEmail(email:string){
        const user:any = await LocalAuthModel.findOne({email:email})
        if(!user){
            console.log("找不到使用者")
            return user;
        }else{
            const {password,updatedAt,...other} = user._doc //將敏感資訊去除掉
            console.log(other)
            return other;
        }
    }
    //follow user
    //要做確認
    //1.自己不能追蹤自己 
    //2.這個追蹤的人不能已經被追蹤過
    public async unfriendUser(id:string,friendId:string){
        const user = await LocalAuthModel.findOneAndUpdate(
            { _id: id},
            { $pull:{friends:friendId} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        const followUser = await LocalAuthModel.findOneAndUpdate(
            { _id: friendId},
            { $pull:{friends:id} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        return user;
    }
    public async friendUser(id:string,friendId:string){
        const user = await LocalAuthModel.findOneAndUpdate(
            { _id: id},
            { $push:{friends:friendId} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        const followUser = await LocalAuthModel.findOneAndUpdate(
            { _id: friendId},
            { $push:{friends:id} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        return user;
    }
    public async createPending(senderId:string,receiverId:string){
        console.log(senderId,receiverId)
        const newPending = new PendingnModel({
            members:[senderId,receiverId],
            senderPending:true,
            receiverPending:false
        }) 
        const savedPending = await newPending.save();
        return savedPending
    }
    public async updatePending(senderId:string,receiverId:string){
        // 此處的sender是欄位裡的receiver
        const pending = await PendingnModel.findOneAndUpdate(
          { members: { $all:[senderId,receiverId]}},
          { receiverPending:true},
          {
            new: true,
            runValidators: true,
            useFindAndModify: false
          }
        );
        return pending
    }
    public async getPending(senderId:string,receiverId:string){
        const pending = await PendingnModel.findOne(
            { members: { $all:[senderId,receiverId]}}
        );
        return pending
    }
    public async deletePending(senderId:string,receiverId:string){
        const pending = await PendingnModel.findOneAndDelete(
            { members: { $all:[senderId,receiverId]}}
        );
        return pending
    }
    public async searchUsers(key:string){
        const all = await LocalAuthModel.find({});
        console.log(all)
        const results = all.filter(user => user.username.toLowerCase
            ().includes(key.toLowerCase()))
        console.log(results)
        return results
    }
    public async recommendUsers(id:string){
        const currentUser:any = await LocalAuthModel.findById(id)
        //console.log(currentUser)
        //尋找最近註冊十筆並且不是使用者好友的人
        const users = await LocalAuthModel.find({'_id':{ "$nin": [id,...currentUser.followings] } }).sort([['createdAt', -1]]).limit(10)
        //console.log("使用者",users)
        return users
    }


}