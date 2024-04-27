import { Injectable } from '@nestjs/common';

@Injectable()
export class SpadminService {

  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'prueba';
  }
}
