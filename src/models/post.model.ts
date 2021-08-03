import { model, Schema } from 'mongoose';
import { EmailValidator } from '../validators';
import { CoreDocument } from '../types/model.type';

const PostSchema = new  Schema(
    {
        userId:{
            type:String,
            required:true
        },
        desc:{
            type:String,
            max:500
        },
        img:{
            type:String
        },
        likes:{
            type:Array,
            default:[]
        },
        comment:{
            type:Array,
            default:[]
        }
    },
    {timestamps:true}
)

//利用interface設置驗證機制
export interface PostDocument extends CoreDocument {
    userId: string;
    desc:string;
    img:string;
    likes:any[];
    comment:any[];
};

export const PostModel = model<PostDocument>('Post', PostSchema); //輸出model