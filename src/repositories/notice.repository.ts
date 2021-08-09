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
    public async sendNotice(senderId:string,object:string,senderPic:string,senderUsername:string,receiverId:string):Promise<NoticeDocument>{
        //必須根據不同的object來設定receiver有哪些人
        // 新增文章 則只要是好友都可以看到 (可以在前端傳進來)
        // 傳送訊息 則要是被傳送訊息的人可以看到 (必須在前端傳進來)
        // 好友邀請和接受好友 要是被送出邀請的人才可以看到 （在前端傳進來
        // 留言 則是該文章作者和其他人能夠看到 (在前端傳進來
        // receiver由前端傳進來？
        const newNotice = new NoticeModel({
            object: object,
            read: [],
            senderId : senderId,
            senderPic : senderPic,
            senderUsername,
            receiverId
        })
        const saveNotice = await newNotice.save();
        return saveNotice;
    }
    public async getNotice(id:string,page:number):Promise<NoticeDocument[]>{
        //先找使用者的friends/follower
        //在receiver裡有自己才回傳
        const notices = await NoticeModel.find({ "receiverId": id}).sort([['createdAt', -1]]).limit(10).skip(page*10)
        return notices
        //尋找notice中 包含friends的內容
    }
    public async updateNotice(noticeId:string,readId:string):Promise<NoticeDocument|null>{
        const notice = await NoticeModel.findByIdAndUpdate(noticeId,
            { $addToSet :{ read: readId} },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        )
        return notice
    }
    public async sendNoticePost(senderId:string,object:string,senderPic:string,senderUsername:string,receiverId:string,postId:string):Promise<NoticeDocument>{
        const newNotice = new NoticeModel({
            object: object,
            read: [],
            senderId : senderId,
            senderPic : senderPic,
            senderUsername,
            receiverId,
            postId
        })
        const saveNotice = await newNotice.save();
        return saveNotice;
    }
    public async deleteNotice(noticeId:string,readId:string):Promise<NoticeDocument|null>{
        const notice = await NoticeModel.findByIdAndDelete(noticeId)
        return notice
    }
}