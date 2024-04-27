import { Injectable } from '@nestjs/common';

@Injectable()
export class GraduatesService {
  getHello() {
    return 'hello world';
  }

  validate() {
    return 1;
  }

  getPrueba() {
    return 'prueba';
  }
}
