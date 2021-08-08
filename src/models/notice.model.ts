import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';

const NoticeSchema = new  Schema(
    {
        //friendRequest,friendAccepted,post,message
        object:{
            type:String,
            require
        },
        read:{
            type:Boolean,
            require
        },
        senderId:{
            type:String,
            require
        },
        senderPic:{
            type:String,
            require
        },
        senderUsername:{
            type:String,
            require
        }
    },
    { timestamps: true}
);

export interface NoticeDocument extends CoreDocument{
    object:string,
    read: Boolean,
    senderId:string,
    senderPic:string,
    senderUsername:string
}

export const NoticeModel  = model<NoticeDocument>('Notice',NoticeSchema);