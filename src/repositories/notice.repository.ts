import { Request } from "express";
import { NoticeModel,NoticeDocument } from "../models/notice.model";
import { LocalAuthModel } from '../models/local-auth.model'
export class NoticeRepository{
    // public async getMessage(conversationId:string):Promise<MessageDocument[]>{
    //     const messages = await MessageModel.find({
    //         conversationId: conversationId
    //     })
    //     return messages
    // }
    public async sendNotice(senderId:string,object:string):Promise<NoticeDocument>{
        const newNotice = new NoticeModel({
            object: object,
            read: false,
            senderId : senderId
        })
        const saveNotice = await newNotice.save();
        return saveNotice;
    }
    public async getNotice(id:string):Promise<NoticeDocument[]>{
        //先找使用者的friends/follower
        const user:any = await LocalAuthModel.findById(id);
        const friends = user.followings
        console.log(friends)
        const notices = await NoticeModel.find({ "senderId": { "$in": friends} })
        return notices
        //尋找notice中 包含friends的內容
    }
}