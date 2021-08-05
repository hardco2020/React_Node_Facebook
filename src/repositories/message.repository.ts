import { Request } from "express";
import { MessageModel,MessageDocument } from "../models/Message.model";
export class MessageRepository{
    public async sendMessage(message:Request):Promise<MessageDocument>{
        const newMessage = new MessageModel(message);
        const savedMessage = await newMessage.save();
        return savedMessage
    }
    public async getMessage(conversationId:string):Promise<MessageDocument[]>{
        const messages = await MessageModel.find({
            conversationId: conversationId
        })
        return messages
    }
}