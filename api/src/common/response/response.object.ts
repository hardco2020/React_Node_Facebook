import { HttpStatus } from '../../types/response.type';

export class ResponseObject<T> {

  public readonly status: HttpStatus = HttpStatus.INTERNAL_ERROR;
  public readonly message: string = '';
  public readonly data: any = null;

  constructor(options: { status?: HttpStatus, message?: string, data?: any } = {}) {
    this.status = options.status || this.status;
    this.message = options.message || this.message;
    this.data = options.data || this.data;
  }//規定傳入的物件為option

  //此處建構 status message data為標準的dto
}