import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';

const ConversationSchema = new  Schema(
    {
        members:{
            type:Array,
        }
    },
    { timestamps: true}
);

export interface ConversationDocument extends CoreDocument{
    members:string[];
}

export const ConversationModel  = model<ConversationDocument>('Conversation',ConversationSchema);