import { Injectable } from '@nestjs/common';

@Injectable()
export class TeachersService {

  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'prueba';
  }
}
