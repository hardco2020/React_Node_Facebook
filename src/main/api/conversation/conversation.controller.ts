import { ControllerBase } from '../../../bases/controller.base';
import { ConversationService } from './conversation.service';
import { Request, Response, NextFunction } from 'express';
import { ResponseObject } from 'common/response/response.object';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { HttpStatus } from '../../../types/response.type';
import { ConversationDocument } from 'models/conversation.model';

export class ConversationController extends ControllerBase {
    private readonly conversationSvc = new ConversationService();

    public async createConversation(req:Request):Promise<ResponseObject<ConversationDocument>>{
        const {senderId,receiverId} = req.body
        const dto = await this.conversationSvc.createConversation(senderId,receiverId)
        return this.formatResponse(dto,HttpStatus.CREATED);
    }
    public async getConversation(req:Request):Promise<ResponseObject<ConversationDocument[]>>{
        const { userId } = req.params
        const dto = await this.conversationSvc.getConversation(userId)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    public async getConversationByTwoId(req:Request):Promise<ResponseObject<ConversationDocument>>{
        const { firstUserId,secondUserId} = req.params
        const dto = await this.conversationSvc.getConversationByTwoId(firstUserId,secondUserId)
        return this.formatResponse(dto,HttpStatus.OK)
    }
    

}