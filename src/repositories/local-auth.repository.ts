import { timeStamp } from 'console';
import crypto from 'crypto'; //加密方法
import {LocalAuthDocument,LocalAuthModel} from '../models/local-auth.model'

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
        const {password,updatedAt,...other} = user._doc //將敏感資訊去除掉
        console.log(other)
        return other;
    }
    public async getUserbyEmail(email:string){
        const user:any = await LocalAuthModel.findOne({email:email})
        const {password,updatedAt,...other} = user._doc //將敏感資訊去除掉
        console.log(other)
        return other;
    }
    //follow user
    //要做確認
    //1.自己不能追蹤自己 
    //2.這個追蹤的人不能已經被追蹤過
    public async followUser(userId:string,followId:string){
        const user = await LocalAuthModel.findOneAndUpdate(
            { _id: userId},
            { $push:{followings:followId} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        const followUser = await LocalAuthModel.findOneAndUpdate(
            { _id: followId},
            { $push:{followers:userId} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        return user;
    }
    
    public async unfollowUser(userId:string,followId:string){
        const user = await LocalAuthModel.findOneAndUpdate(
            { _id: userId},
            { $pull:{followings:followId} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        const followUser = await LocalAuthModel.findOneAndUpdate(
            { _id: followId},
            { $pull:{followers:userId} },
            {
              new: true,
              runValidators: true,
              useFindAndModify: false
            }
        );
        return user;
    }
    public async searchUsers(key:string){
        const all = await LocalAuthModel.find({});
        const results = all.filter(user => user.username.includes(key))
        console.log(results)
        return results
    }



}