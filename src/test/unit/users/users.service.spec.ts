import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In, DeleteResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersService } from '../../../modules/users/services/users.service';
import { User } from '../../../modules/users/entities/user.entity';
import { Gender } from '../../../modules/users/entities/gender.entity';
import { DniType } from '../../../modules/users/entities/dniType.entity';
import { Role } from '../../../modules/users/entities/role.entity';
import { Status } from '../../../modules/users/entities/status.entity';
import { CreateUserDto, UpdateUserDto } from '../../../modules/users/dtos/user.dto';
import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let service: UsersService;
  let userRepo: Repository<User>;
  let genderRepo: Repository<Gender>;
  let dniTypeRepo: Repository<DniType>;
  let roleRepo: Repository<Role>;
  let statusRepo: Repository<Status>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            merge: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Gender),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(DniType),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Role),
          useValue: {
            findBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Status),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    genderRepo = module.get<Repository<Gender>>(getRepositoryToken(Gender));
    dniTypeRepo = module.get<Repository<DniType>>(getRepositoryToken(DniType));
    roleRepo = module.get<Repository<Role>>(getRepositoryToken(Role));
    statusRepo = module.get<Repository<Status>>(getRepositoryToken(Status));
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: User[] = [{
        id: 1,
        name: 'John',
        last_name: 'Doe',
        dni: 123456789,
        phone_number: 987654321,
        email: 'john.doe@example.com',
        alt_email: 'john.alt@example.com',
        password: 'hashedpassword',
        gender: {} as Gender,
        dni_type: {} as DniType,
        status: {} as Status,
        role: [] as Role[],
        employmnetData: [],  // Asegúrate de que estos campos sean correctos según la definición de tu tipo
        academicData: [],    // Si estos campos no son obligatorios, asegúrate de que no se incluyan
        academicProgram: [], // Si son obligatorios, asegúrate de proporcionar valores válidos
      }];
      jest.spyOn(userRepo, 'find').mockResolvedValue(result);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const result: User = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        dni: 123456789,
        phone_number: 987654321,
        email: 'john.doe@example.com',
        alt_email: 'john.alt@example.com',
        password: 'hashedpassword',
        gender: {} as Gender,
        dni_type: {} as DniType,
        status: {} as Status,
        role: [] as Role[],
        employmnetData: [], // Asegúrate de que estos campos sean correctos según la definición de tu tipo
        academicData: [],  // Si estos campos no son obligatorios, asegúrate de que no se incluyan
        academicProgram: [], // Si son obligatorios, asegúrate de proporcionar valores válidos
      };
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toEqual(result);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('validateUserRegister', () => {
    it('should activate user if credentials match', async () => {
      const existingUser: User = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        dni: 123456789,
        phone_number: 987654321,
        email: 'john.doe@example.com',
        alt_email: 'john.alt@example.com',
        password: 'hashedpassword',
        gender: {} as Gender,
        dni_type: { id: 1 } as DniType,
        status: { id: 3 } as Status,
        role: [] as Role[],
        employmnetData: [], // Asegúrate de que estos campos sean correctos según la definición de tu tipo
        academicData: [],
        academicProgram: [],
      };
      jest.spyOn(service, 'findByEmail').mockResolvedValue(existingUser);
      jest.spyOn(service, 'update').mockResolvedValue(existingUser);

      const result = await service.validateUserRegister({
        email: 'john.doe@example.com',
        dniTypeId: 1,
        dni: 123456789,
      });

      expect(result).toEqual({ success: 'Usuario Activado correctamente' });
    });

    it('should return error if user not found', async () => {
      jest.spyOn(service, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUserRegister({
        email: 'john.doe@example.com',
        dniTypeId: 1,
        dni: 123456789,
      });

      expect(result).toEqual({ error: 'El correo electrónico no está registrado' });
    });

    it('should return error if DNI type or number does not match', async () => {
      const existingUser: User = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        dni: 123456789,
        phone_number: 987654321,
        email: 'john.doe@example.com',
        alt_email: 'john.alt@example.com',
        password: 'hashedpassword',
        gender: {} as Gender,
        dni_type: { id: 2 } as DniType, // Different DNI type
        status: { id: 3 } as Status,
        role: [] as Role[],
        employmnetData: [], // Asegúrate de que estos campos sean correctos según la definición de tu tipo
        academicData: [],
        academicProgram: [],
      };
      jest.spyOn(service, 'findByEmail').mockResolvedValue(existingUser);

      const result = await service.validateUserRegister({
        email: 'john.doe@example.com',
        dniTypeId: 1,
        dni: 123456789,
      });

      expect(result).toEqual({
        error: 'El numero o el tipo de documento ingresado no coincide con el correo',
      });
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        alt_email: 'alt@example.com',
        password: 'password',
        name: 'John',
        last_name: 'Doe',
        dni: 123456789,
        phone_number: 987654321,
        dniTypeId: 1,
        statusId: 1,
        genderId: 1,
        rolesId: [1],
      };

      const newUser: User = {
        id: 1,
        ...createUserDto,
        gender: {} as Gender,
        dni_type: {} as DniType,
        status: {} as Status,
        role: [] as Role[],
        employmnetData: [],
        academicData: [],
        academicProgram: [],
      };

      jest.spyOn(userRepo, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepo, 'save').mockResolvedValue(newUser);
      jest.spyOn(genderRepo, 'findOne').mockResolvedValue({ id: 1 } as Gender);
      jest.spyOn(dniTypeRepo, 'findOne').mockResolvedValue({ id: 1 } as DniType);
      jest.spyOn(statusRepo, 'findOne').mockResolvedValue({ id: 1 } as Status);
      jest.spyOn(roleRepo, 'findBy').mockResolvedValue([{ id: 1 } as Role]);

      expect(await service.create(createUserDto)).toEqual(newUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
        last_name: 'Updated LastName',
        dni: 123456789,
        phone_number: 987654321,
        email: 'updated@example.com',
        alt_email: 'updated.alt@example.com',
        genderId: 1,
        dniTypeId: 1,
        statusId: 1,
        rolesId: [1],
      };

      const existingUser: User = {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        dni: 123456789,
        phone_number: 987654321,
        email: 'john.doe@example.com',
        alt_email: 'john.alt@example.com',
        password: 'hashedpassword',
        gender: {} as Gender,
        dni_type: {} as DniType,
        status: {} as Status,
        role: [] as Role[],
        employmnetData: [], // Asegúrate de que estos campos sean correctos según la definición de tu tipo
        academicData: [],
        academicProgram: [],
      };

      jest.spyOn(userRepo, 'findOne').mockResolvedValue(existingUser);
      jest.spyOn(userRepo, 'merge').mockReturnValue(existingUser);
      jest.spyOn(userRepo, 'save').mockResolvedValue(existingUser);

      expect(await service.update(1, updateUserDto)).toEqual(existingUser);
    });

    it('should throw NotFoundException if user is not found for update', async () => {
      jest.spyOn(userRepo, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, {} as UpdateUserDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      jest.spyOn(userRepo, 'delete').mockResolvedValue({ affected: 1 } as DeleteResult);

      const result = await service.remove(1);
      expect(result).toEqual({ affected: 1 });
    });

    it('should throw NotFoundException if user is not found for removal', async () => {
      jest.spyOn(userRepo, 'delete').mockResolvedValue({ affected: 0 } as DeleteResult);

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });

});

