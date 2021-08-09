import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';

const PendingSchema = new  Schema(
    {
        members:{
            type:Array,
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
    members: string[],
    senderPending:boolean,
    receiverPending:boolean
}

export const PendingnModel  = model<PendingDocument>('Pending',PendingSchema);