import { ControllerBase } from '../../../bases/controller.base';
import { MessageService } from './message.service';

import { ResponseObject } from 'common/response/response.object';
import { JWTPayloadDTO } from '../../../dtos/jwt-payload.dto';
import { HttpStatus } from '../../../types/response.type';
import { Request } from 'express';
import { MessageDocument } from 'models/Message.model';

export class MessageController extends ControllerBase {
    private readonly messageSvc = new MessageService();
    public async sendMessage(req:Request):Promise<ResponseObject<MessageDocument>>{
        const newMessage = req.body
        const dto = await this.messageSvc.sendMessage(newMessage)
        return this.formatResponse(dto,HttpStatus.CREATED)
    }
    public async getMessage(req:Request):Promise<ResponseObject<MessageDocument[]>>{
        const { cvsId,page } = req.params
        const dto = await this.messageSvc.getMessage(cvsId,parseInt(page))
        return this.formatResponse(dto,HttpStatus.OK)
    }
    

    // public async getConversation(req:Request):Promise<ResponseObject<ConversationDocument>>{
    //     const { userId } = req.params
    //     const dto = await this.conversationSvc.getConversation(userId)
    //     return this.formatResponse(dto,HttpStatus.OK)
    // }
}