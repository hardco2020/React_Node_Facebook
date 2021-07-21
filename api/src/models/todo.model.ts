import { model, Schema, Types } from 'mongoose';

import { CoreDocument } from '../types/model.type';


const TodoSchema = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      required: true
    },
    time:{
      type:String,
      required:true
    },
    date:{
      type:String,
      required:true
    },
    owner: {
      type: Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
  //timestamps 是啟用 createdAt 與 updatedAt 的配置
  //可以這樣設置schema?
);

export interface TodoDocument extends CoreDocument {
    content: string;
    completed: boolean;
    owner: string;
    time:string;
    date:string;
  };

export const TodoModel = model<TodoDocument>('Todo', TodoSchema); //輸出model
//這樣就能給予型態
//但在使用時無法知道有哪些欄位，因為 model() 預設是定義輸出 Document 型別，
//這時候我們就要寫 Interface 來處理這個問題，考量到還有共用欄位 createdAt 與 updatedAt
//所以在 types 資料夾下建立 model.type.ts：