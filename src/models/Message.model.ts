import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';

const MessageSchema = new  Schema(
    {
        conversationId:{
            type:String
        },
        sender:{
            type:String
        },
        text:{
            type:String
        }
    },
    { timestamps: true}
);

export interface  MessageDocument extends CoreDocument{
    conversationId:string,
    sender:string,
    text:string,
}
export const MessageModel = model<MessageDocument>('Message',MessageSchema)