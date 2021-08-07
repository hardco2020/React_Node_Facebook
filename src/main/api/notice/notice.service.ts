import { Request } from "express";
import { NoticeRepository } from "../../../repositories/notice.repository";
import { HttpStatus } from '../../../types/response.type';


export class NoticeService {
    private readonly ntRepo = new NoticeRepository();
    public async sendNotice(senderId:string, object:string){
        const newNotice = await this.ntRepo.sendNotice(senderId,object)
        return newNotice;
    }
    public async getNotice(id:string){
        const notice = await this.ntRepo.getNotice(id)
        return notice
    }
}

   