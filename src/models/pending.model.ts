import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';

const PendingSchema = new  Schema(
    {
        senderId:{
            type:String,
            require
        },
        receiverId:{
            type:String,
            require
        },
        senderPending:{
            type:Boolean,
            require
        },
        receiverPending:{
            type:Boolean,
            require
        }
    },
    { timestamps: true}
);

export interface PendingDocument extends CoreDocument{
    senderId:string,
    receiverId:string,
    senderPending:boolean,
    receiverPending:boolean
}

export const PendingnModel  = model<PendingDocument>('Pending',PendingSchema);