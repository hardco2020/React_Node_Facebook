import express from 'express'
import { RouteBase } from './bases/route.base';
import { ApiRoute } from './main/api/api.routing';
import { AuthRoute } from './main/auth/auth.routing';

export class AppRoute extends RouteBase {

  public apiRoute = new ApiRoute();
  public authRoute = new AuthRoute();

  constructor() {
    super();
    //this.first();
  }
  protected initial():void{
      this.apiRoute = new ApiRoute();
      this.authRoute = new  AuthRoute();
      super.initial();
  }

  public registerRoute(): void {
    //console.log(this.apiRoute)
    this.router.use('/api', this.apiRoute.router);
    this.router.use('/auth',this.authRoute.router);
  }

};