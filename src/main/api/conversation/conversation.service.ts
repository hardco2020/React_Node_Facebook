
import { ConversationModel } from 'models/conversation.model';
import { ConversationRepository } from '../../../repositories/conversation.repository';


export class ConversationService {
    private readonly cvsRepo = new ConversationRepository();
    
    public async createConversation(senderId:string,receiverId:string){
        const newConversation = await this.cvsRepo.creatConversation(senderId,receiverId);
        return newConversation;
    }
    public async getConversation(userId:string){
        const getConversation = await this.cvsRepo.getConversation(userId)
        return getConversation
    }
    public async getConversationByTwoId(firstId:string,secondId:string){
        const getConversationByTwoId = await this.cvsRepo.getConversationByTwoId(firstId,secondId)
        return getConversationByTwoId;
    }
    // public async createPost(id:string,body:any){
    //     const post = await this.postRepo.createPost(id,body);
    //     return post;
    // }

}