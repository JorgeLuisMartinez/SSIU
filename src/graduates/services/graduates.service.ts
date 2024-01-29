import { Injectable } from '@nestjs/common';

@Injectable()
export class GraduatesService {
  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'prueba';
  }
}
