import { ControllerBase } from '../../../bases/controller.base';
import { NoticeService } from './notice.service';

import { ResponseObject } from 'common/response/response.object';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { HttpStatus } from '../../../types/response.type';
import { Request } from 'express';
import { NoticeDocument } from 'models/notice.model';

export class NoticeController extends ControllerBase {
    private readonly NoticeSvc = new NoticeService();
    
    public async sendNotice(req:Request):Promise<ResponseObject<NoticeDocument>>{
        const { object,senderId,senderPic,senderUsername } = req.body
        const dto = await this.NoticeSvc.sendNotice(senderId,object,senderPic,senderUsername)
        return this.formatResponse(dto,HttpStatus.CREATED)

    }
    public async getNotice(req:Request):Promise<ResponseObject<NoticeDocument[]>>{
        const { id } = req.params
        const dto = await this.NoticeSvc.getNotice(id)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    // public async getConversation(req:Request):Promise<ResponseObject<ConversationDocument>>{
    //     const { userId } = req.params
    //     const dto = await this.conversationSvc.getConversation(userId)
    //     return this.formatResponse(dto,HttpStatus.OK)
    // }
}