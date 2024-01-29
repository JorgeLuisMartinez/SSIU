import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployersService {

  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'prueba';
  }
}
