import { LocalAuthRepository } from "../../../repositories/local-auth.repository";
import { HttpStatus } from '../../../types/response.type';
import JWT from 'jsonwebtoken';
import jwt from 'jsonwebtoken'
import { LocalAuthDocument } from "../../../models/local-auth.model";

import passport from 'passport';
import { Strategy, VerifyFunction } from 'passport-local';

export class LocalAuthService {
    private readonly localAuthRepo = new LocalAuthRepository();
    //jwt token
    public generateJWT(user: LocalAuthDocument): string {

        //const SECRET = 'thisismynewproject'
        //const token = jwt.sign({ _id: user._id.toString() }, SECRET, { expiresIn: '1 day' })
        //console.log(token)
        //return token
        const expiry = new Date();
        console.log(process.env.JWT_SIGN)
        expiry.setDate(expiry.getDate() + 30);
        return JWT.sign(
            {    
          _id: user._id,
          username: user.username,
          exp: expiry.getTime() / 1000
        },(process.env.JWT_SIGN as string));
    }
    //passport 用法
    public get Strategy() {
        return new Strategy(
          { session: false }, //session 為是否啟用 session 的配置項目，因為我們用 JWT，就不啟用 session 囉
          this.verifyUserFlow()
        );
    }
    private verifyUserFlow(): VerifyFunction {
        return (username: string, password: string, done) => {
          let data:any 
          const emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/; //2009-2-12更正為比較簡單的驗證
          if (emailRegxp.test(username) === true){
            data= {"email":username}
          }else{
            data = {"username":username}
          }
          
          this.localAuthRepo.getUser({data}) //看是否有user
            .then(user => {
              const error = new Error();
              if ( !user ) {
                error.message = '查無此用戶';
                (error as any).status = HttpStatus.NOT_FOUND;
                return done(error);
              }
              if ( !this.verifyPassword(user, password) ) {
                error.message = '您輸入的密碼有誤';
                (error as any).status = HttpStatus.FORBIDDEN;
                return done(error);
              }
              return done(null, user);
            })
            //驗證函式前兩個參數即 username 與 password，第三個參數為結束驗證流程用的函式 done，它採用 Error-First 的方式，所以 done 的第一個參數要傳入 錯誤資訊 ，第二個為 user 資訊，第三個為自訂選項。
            .catch((err: Error) => done(err));
        }
    }
    private verifyPassword(user: LocalAuthDocument, password: string): boolean {
        const pair = this.localAuthRepo.hashPassword(password, user.password.salt);
        return pair.hash === user.password.hash;
    }
    public authenticate(...args: any[]): Promise<string> {
        return new Promise((resolve, reject) => {
          passport.authenticate('local', (err: Error, user: LocalAuthDocument) => { //此處會去接verifyfunction
            if ( err ) {
              return reject(err);
            }
            const token = this.generateJWT(user);
            resolve(token);
          })(...args);
        });
      }//可以看到傳入參數為 args，主要是把 Request、Response 與 NextFunction 帶入 authenticate 中。
    public async addUser(username:string,password:string,email:string){
        //需要確認是否有使用過
        const isUsedEmail = await this.localAuthRepo.getUserbyEmail(email)
        const isUsedName = await this.localAuthRepo.getUserbyUsername(username)
        if(isUsedEmail || isUsedName){
            const error = new Error('使用者名稱或電子信箱已被使用');
            (error as any).status = HttpStatus.CONFLICT;
            console.log(error) //看看裡面的屬性
            throw error;
        }
        const user = await this.localAuthRepo.addUser(username, password, email);
        return user;
    }
}