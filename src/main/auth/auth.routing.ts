import { RouteBase } from '../../bases/route.base';
import { LocalAuthRoute } from './local/local-auth.routing';
import express from 'express'

export class AuthRoute extends RouteBase {

  private authRoute = new LocalAuthRoute();
  constructor() {
    super();
    //this.first();
  }
  protected initial():void{
    this.authRoute = new LocalAuthRoute();
    super.initial();
}
  protected registerRoute(): void {
    this.router.use('/local', this.authRoute.router);
  }

}