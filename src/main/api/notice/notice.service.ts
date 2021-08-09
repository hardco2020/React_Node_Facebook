import { Request } from "express";
import { NoticeRepository } from "../../../repositories/notice.repository";
import { HttpStatus } from '../../../types/response.type';


export class NoticeService {
    private readonly ntRepo = new NoticeRepository();
    public async sendNotice(senderId:string, object:string,senderPic:string,senderUsername:string,receiverId:string){
        const newNotice = await this.ntRepo.sendNotice(senderId,object,senderPic,senderUsername,receiverId)
        return newNotice;
    }
    public async getNotice(id:string,page:number){
        const notice = await this.ntRepo.getNotice(id,page)
        return notice
    }
    public async updateNotice(noticeId:string,readId:string){
        const notice = await this.ntRepo.updateNotice(noticeId,readId)
        return notice
    }
    public async sendNoticePost(senderId:string, object:string,senderPic:string,senderUsername:string,receiverId:string,postId:string){
        const newNotice = await this.ntRepo.sendNoticePost(senderId,object,senderPic,senderUsername,receiverId,postId)
        return newNotice;
    }
    public async deleteNotice(noticeId:string,readId:string){
        const notice = await this.ntRepo.deleteNotice(noticeId,readId)
        return notice
    }
}
   