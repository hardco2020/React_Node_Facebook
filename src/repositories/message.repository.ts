import { Request } from "express";
import { MessageModel,MessageDocument } from "../models/Message.model";
export class MessageRepository{
    public async sendMessage(message:Request):Promise<MessageDocument>{
        const newMessage = new MessageModel(message);
        const savedMessage = await newMessage.save();
        return savedMessage
    }
    public async getMessage(conversationId:string,page:number):Promise<MessageDocument[]>{
        const messages = await MessageModel.find({
            conversationId: conversationId
        })
        //.limit(20).skip(page*20).sort([['createdAt', -1]]) 暫時實現不了paging
        return messages
    }
}