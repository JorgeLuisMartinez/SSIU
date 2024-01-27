import { Controller, Get } from '@nestjs/common';

@Controller('employers')
export class EmployersController {

  @Get()
  getHello() {
    return 'hello world';
  }
}
