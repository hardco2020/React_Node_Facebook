import { model, Schema } from 'mongoose';
import { CoreDocument } from '../types/model.type';
import { EmailValidator } from '../validators';

const LocalAuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 12
    },
    password: {
      //利用salt和hash來做加密
      salt: {
        type: String,
        required: true
      },
      hash: {
        type: String,
        required: true
      }
    },
    email: {
      type: String,
      required: true,
      //validate辦法？
      validate: {
        validator: EmailValidator
      }
    },
    profilePicture:{
      type:String,
      default:""
    },
    coverPicture:{
      type:String,
      default:""
    },
    followers:{
      type:Array,
      default:[]
    },
    followings:{
      type:Array,
      default:[],
    },
    isAdmin:{
      type:Boolean,
      default:false,
    },
    desc:{
      type:String,
      max:50
    },
    city:{
      type:String,
      max:50
    },
    from:{
      type:String,
      max:50 
    },
    relationship:{
      type:Number,
      enum:[1,2,3],
    },
    friends:{
      type:Array
    }
  },
  {
    timestamps: true
  }
);
//利用interface設置驗證機制
export interface LocalAuthDocument extends CoreDocument {
  username: string;
  password: {
    salt: string;
    hash: string;
  };
  email: string;
  profilePicture:string;
  coverPicture:string;
  followers: any[];
  follwings:any[];
  isAdmin:Boolean;
  desc:string;
  city:string;
  from:string;
  relationship:number;
  friends:any[];
}

export const LocalAuthModel = model<LocalAuthDocument>('User', LocalAuthSchema);