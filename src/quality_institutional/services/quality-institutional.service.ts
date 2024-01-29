import { Injectable } from '@nestjs/common';

@Injectable()
export class QualityInstitutionalService {
  getHello() {
    return 'hello world';
  }

  getPrueba() {
    return 'prueba';
  }
}
