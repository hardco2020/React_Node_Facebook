
import { ConversationDocument, ConversationModel } from "../models/conversation.model"

export class ConversationRepository{
    public async creatConversation(senderId:string,receiverId:string):Promise<ConversationDocument>{
        const newConversation = new ConversationModel({
            members:[senderId,receiverId],
        });
        //console.log(newConversation)
        const savedConversation = await newConversation.save();
        return  savedConversation;
    }
    public async getConversation(userId:string):Promise<ConversationDocument[]>{
        const conversation = await ConversationModel.find({
            members:{ $in:[userId]}
        })
        return conversation
    }
    public async getConversationByTwoId(firstId:string,secondId:string):Promise<ConversationDocument|null>{
        const conversation = await ConversationModel.findOne({
            members: { $all:[firstId,secondId]}
        })
        return conversation
    }
    // public async getPost(id:string):Promise<PostDocument>{
    //     const post:any = await PostModel.findById(id);
    //     return post;
    // }

}