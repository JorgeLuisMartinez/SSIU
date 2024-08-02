import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { UsersService } from '../../../modules/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../../modules/users/entities/user.entity';
import { PayloadToken } from '../../../modules/auth/models/token.model';

// Mock de servicios y dependencias
const mockUsersService = {
  findByEmail: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

// Mock de bcrypt
jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user if email and password are correct', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = await bcrypt.hash(password, 10); // Asegúrate de que hash esté mockeado
      const user: User = { id: 1, email, password: hashedPassword, role: 'user' } as any;

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser(email, password);
      expect(result).toEqual(user);
    });

    it('should return error message if password is incorrect', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const hashedPassword = await bcrypt.hash('wrongPassword', 10);
      const user: User = { id: 1, email, password: hashedPassword, role: 'user' } as any;

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser(email, password);
      expect(result).toEqual({ error: 'La contraseña proporcionada es incorrecta' });
    });

    it('should return error message if user is not found', async () => {
      const email = 'test@example.com';
      const password = 'password';

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser(email, password);
      expect(result).toEqual({ error: 'El correo electrónico no está registrado' });
    });
  });

  describe('genarateJWT', () => {
    it('should return a JWT token and user', async () => {
      const user: User = { id: 1, email: 'test@example.com', password: 'password', role: 'user' } as any;
      const payload: PayloadToken = { role: 'user', sub: 1 };
      const access_token = 'token';

      jest.spyOn(jwtService, 'sign').mockReturnValue(access_token);

      const result = await service.genarateJWT(user);
      expect(result).toEqual({ access_token, user });
    });
  });
});
