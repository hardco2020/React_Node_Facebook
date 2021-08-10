
import { Request } from "express";
import { MessageRepository } from "../../../repositories/message.repository";
import { HttpStatus } from '../../../types/response.type';


export class MessageService {
    private readonly msRepo = new MessageRepository();

    public async sendMessage(message:Request){
        const newMessage = await this.msRepo.sendMessage(message)
        return newMessage
    }
    public async getMessage(conversationId:string,page:number){
        const messages = await this.msRepo.getMessage(conversationId,page)
        return messages
    }

}

   