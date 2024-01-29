import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {

  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'employerprueba';
  }
}
