import { HttpStatus } from '../types/response.type';
import { ResponseObject } from '../common/response/response.object';

export abstract class ControllerBase {
  //回傳型態 包含data和 status code
  public formatResponse(data: any, status = HttpStatus.INTERNAL_ERROR): ResponseObject<any> {
    const options: any = { status };

    //大於400代表發生錯誤
    status >= 400
    ? options.message = data //message顯示錯誤訊息
    : options.data = data; //沒發生錯誤 正常匯入data

     //將option裡的內容傳入responseObject
    const responseObject = new ResponseObject(options);

    return responseObject;
  }

}