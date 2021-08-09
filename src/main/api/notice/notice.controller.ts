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
        const { object,senderId,senderPic,senderUsername,receiverId } = req.body
        const dto = await this.NoticeSvc.sendNotice(senderId,object,senderPic,senderUsername,receiverId)
        return this.formatResponse(dto,HttpStatus.CREATED)

    }
    public async getNotice(req:Request):Promise<ResponseObject<NoticeDocument[]>>{
        const { id,page } = req.params
        const dto = await this.NoticeSvc.getNotice(id,parseInt(page))
        return this.formatResponse(dto,HttpStatus.OK)
    }
    public async updateNotice(req:Request):Promise<ResponseObject<NoticeDocument>>{
        const { noticeId } = req.params
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const dto = await this.NoticeSvc.updateNotice(noticeId,payload._id)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    public async sendNoticePost(req:Request):Promise<ResponseObject<NoticeDocument>>{
        const { object,senderId,senderPic,senderUsername,receiverId,postId } = req.body
        const dto = await this.NoticeSvc.sendNoticePost(senderId,object,senderPic,senderUsername,receiverId,postId)
        return this.formatResponse(dto,HttpStatus.CREATED)

    }
    public async deleteNotice(req:Request):Promise<ResponseObject<NoticeDocument>>{
        const { noticeId } = req.params
        const payload = new JWTPayloadDTO((req as any).payload); //驗證token
        const dto = await this.NoticeSvc.deleteNotice(noticeId,payload._id)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    // public async getConversation(req:Request):Promise<ResponseObject<ConversationDocument>>{
    //     const { userId } = req.params
    //     const dto = await this.conversationSvc.getConversation(userId)
    //     return this.formatResponse(dto,HttpStatus.OK)
    // }
}