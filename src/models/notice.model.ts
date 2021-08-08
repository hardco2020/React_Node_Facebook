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
            type:Array,
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
        },
        receiverId:{
            type:Array,
        },
        postId:{
            type:String,
        }
    },
    { timestamps: true}
);

export interface NoticeDocument extends CoreDocument{
    object:string,
    read: string[],
    senderId:string,
    senderPic:string,
    senderUsername:string
    receiverId:string,
    postId:string
}

export const NoticeModel  = model<NoticeDocument>('Notice',NoticeSchema);