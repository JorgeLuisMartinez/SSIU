import { Injectable } from '@nestjs/common';

@Injectable()
export class QualityLeaderService {

  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'prueba';
  }
}
