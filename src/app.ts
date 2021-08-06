import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
//import morgan from 'morgan';
import { TodoRoute } from './main/api/todo/todo.routing';
import { LocalAuthRoute}  from './main/auth/local/local-auth.routing';
import { AppRoute } from './app.routing';
import { ErrorRequestHandler } from 'express';
import { Database } from './database';
import passport from 'passport';
import { createServer } from 'http';
import { Server,Socket } from 'socket.io'
import JWTGuard from 'express-jwt';
import { HttpStatus } from './types/response.type'

export class App {

  private app = express();

  constructor() {
    //this.setMorgan();
    this.setClient();
    this.setPassport();
    this.setEnvironment();
    this.setHelmet();
    this.setCors();
    this.registerRoute();
  }

  // ====================================================================
  // @Public Methods
  // ====================================================================


  public bootstrap(): void {
    console.log("cool")
    const httpServer = createServer(this.app);
    
    this.setSocket(httpServer)
    httpServer.listen( process.env.PORT,()=>{
      console.log("Server is listening on port %d",process.env.PORT)
    });
    //this.app.listen(process.env.PORT, () => console.log(`API Server is running at port ${ process.env.PORT }.`));
  }

  // ====================================================================
  // @Private Methods
  // ====================================================================
  private setClient():void{
    this.app.use(express.static('./client/src'))
    this.app.use(express.static(__dirname + '/public'));
  }
  private setPassport(): void {
    passport.initialize();
  }
  // private setMorgan():void{
  //   t
  // }
  private setHelmet(): void {
    this.app.use(helmet());
  }
  
  private setSocket(httpServer:any):void{
    const io = new Server(httpServer, {
      cors:{
        origin:process.env.SOCKET_ORIGIN
        
      },
    });
    let users:any[] = [];
    const addUser = (userId:string,socketId:string)=>{
        //some = 判定是否至少有一個在陣列裡面
        !users.some(user=>user.userId===userId) &&
            users.push({userId,socketId});
    }

    const removeUser = (socketId:string)=>{
        users = users.filter(user=>user.socketId !== socketId)
    }

    const getUser = (userId:string)=>{
        return users.find(user=>user.userId === userId)
    }
    io.on("connection",(socket)=>{
        //when connect
        console.log("a user connected")
        //take userId and socketId from user
        socket.on("addUser",userId=>{
            addUser(userId,socket.id);
            //把有連接的人的Id都丟給所有user這樣才知道誰有上限
            io.emit("getUsers",users)
        })
        //send and get message
        socket.on("sendMessage",({ senderId,receiverId,text})=>{
            const user = getUser(receiverId);
            io.to(user.socketId).emit("getMessage",{
              senderId,
              text, 
            });
        })
        //when disconnect
        socket.on("disconnect",()=>{
            console.log("a user disconnected")
            removeUser(socket.id);
            io.emit("getUsers",users)
        })
    })
  }
  private setCors(): void {
    this.app.use(cors());
  }

  private setEnvironment(): void {
    dotenv.config({ path: path.resolve(__dirname, `./environments/${ process.env.NODE_ENV }.env`) });
  }
  //處理錯誤
  public setException(handler: ErrorRequestHandler): void {
    this.app.use(handler);
  }
  public launchDatabase(): void {
    const database = new Database();
    database.connect();
  }
  private todoroute = new TodoRoute();
  private localauthroute = new LocalAuthRoute();
  private route!: AppRoute;
  private registerRoute(): void {;
    this.route = new AppRoute()
    this.app.use('/', this.route.router);
    //get index file and route
    this.app.get("*",(req,res)=>{
      res.set("Content-Security-Policy", "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
      res.sendFile(path.resolve(__dirname,"../client","build","index.html"));
    });
    //this.app.use('/todos', this.todoroute.router);
    //this.app.use('/localauth',this.localauthroute.router);
  }
}