import { Test, TestingModule } from '@nestjs/testing';
import { SpadminService } from './spadmin.service';

describe('SpadminService', () => {
  let service: SpadminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpadminService],
    }).compile();

    service = module.get<SpadminService>(SpadminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return "hello world" from getHello', () => {
    expect(service.getHello()).toBe('hello world');
  });

  it('should return "prueba" from getPrueba', () => {
    expect(service.getPrueba()).toBe('prueba');
  });
});
