import { ControllerBase } from '../../../bases/controller.base';
import { UserService} from './user.service'
import { ResponseObject } from '../../../common/response/response.object';
import { Request, Response, NextFunction } from 'express';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { HttpStatus } from '../../../types/response.type';
import { LocalAuthDocument } from '../../../models/local-auth.model';
import { PendingDocument} from '../../../models/pending.model'
export class UserController extends ControllerBase {
    //只有管理者或者user才能使用token

    private readonly userSvc = new UserService();
    public async updateUser(req: Request): Promise<ResponseObject<LocalAuthDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        //一連串的資料集合
        console.log(req.body);
        const dto = await this.userSvc.updateUser(payload,req.body);//觸發service
        return this.formatResponse(dto, HttpStatus.OK);
    }
    public async getUser(req:Request):Promise<ResponseObject<LocalAuthDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        //使用者有可能使用id或者username來抓
        const userId:any= req.query.userId;
        const username:any = req.query.username;
        const dto = userId
          ? await this.userSvc.getUserbyId(userId)
          : await this.userSvc.getUserbyUsername(username);
        //const {id} = req.params
        //console.log(id)
        //const dto = await this.userSvc.getUserbyId(id);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async friendUser(req:Request):Promise<ResponseObject<string>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const {id} = req.params
        const dto = await this.userSvc.friendUser(payload._id,id);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async unfriendUser(req:Request):Promise<ResponseObject<string>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const {id} = req.params
        const dto = await this.userSvc.unfriendUser(payload._id,id);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async createPending(req:Request):Promise<ResponseObject<PendingDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const { receiverId } = req.params
        const dto = await this.userSvc.createPending(payload._id,receiverId);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async updatePending(req:Request):Promise<ResponseObject<PendingDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const { senderId } = req.params
        const dto = await this.userSvc.updatePending(payload._id,senderId);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async getPending(req:Request):Promise<ResponseObject<PendingDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const { receiverId } = req.params
        const dto = await this.userSvc.getPending(payload._id,receiverId);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async deletePending(req:Request):Promise<ResponseObject<PendingDocument>>{
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const { receiverId } = req.params
        const dto = await this.userSvc.deletePending(payload._id,receiverId);
        return this.formatResponse(dto,HttpStatus.OK);
    }
    public async getFriends(req:Request){ 
        const id = req.params.id
        const dto = await this.userSvc.getFriends(id)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    public async searchUsers(req:Request){
        const key = req.params.key
        const dto = await this.userSvc.searchUsers(key)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    public async recommendUsers(req:Request){
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const dto = await this.userSvc.recommendUsers(payload._id)
        return this.formatResponse(dto,HttpStatus.OK)
    }
}

