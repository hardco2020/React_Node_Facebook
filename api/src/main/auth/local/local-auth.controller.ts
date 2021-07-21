import { Request,Response,NextFunction} from 'express';

import { ControllerBase } from '../../../bases/controller.base';
import { LocalAuthService } from './local-auth.service';
import { ResponseObject } from '../../../common/response/response.object';
import { HttpStatus } from '../../../types/response.type';
import passport from 'passport';

export class LocalAuthController extends ControllerBase {
    protected readonly localAuthSvc = new LocalAuthService();

    public async signup(req:Request):Promise<ResponseObject<string>>{
        console.log("身體",req.body)
        const {username,password,email} = req.body;
        const user = await this.localAuthSvc.addUser(username,password,email);
        const token = this.localAuthSvc.generateJWT(user);
        return this.formatResponse(token,HttpStatus.CREATED);
    }
    public async signin(
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<ResponseObject<FunctionStringCallback>> {
        //發token
        passport.use(this.localAuthSvc.Strategy);
        const token = await this.localAuthSvc.authenticate(req, res, next);
        return this.formatResponse(token, HttpStatus.OK);
      }
}