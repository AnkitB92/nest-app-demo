import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private usersList: UserInterface[] = [
    { id: 1, name: 'Ankit', email: 'ankit@mail.com', role: 'INTERN' },
    { id: 2, name: 'Dave', email: 'dave@mail.com', role: 'ENGINEER' },
    { id: 3, name: 'John', email: 'john@mail.com', role: 'ADMIN' },
  ];

  private nextUserId(): number {
    return this.usersList.reduce((max, user) => Math.max(max, user.id), 0) + 1;
  }

  private duplicate<K extends keyof UserInterface>(
    key: K,
    value: UserInterface[K],
    userToUpdateId?: UserInterface['id'],
  ): number {
    return this.usersList.findIndex(
      (user) =>
        user[key] === value &&
        (userToUpdateId === undefined || user.id !== userToUpdateId),
    );
  }

  create(createUserDto: CreateUserDto): UserInterface {
    const userIndex = this.duplicate('email', createUserDto.email);
    if (userIndex !== -1) {
      throw new ConflictException(`Provided email is already in use`);
    }

    const newUser: UserInterface = {
      id: this.nextUserId(),
      ...createUserDto,
    };
    this.usersList.push(newUser);
    return newUser;
  }

  findAll(role?: UserInterface['role']): UserInterface[] {
    if (role === undefined) return [...this.usersList];
    return this.usersList.filter((u) => u.role === role);
  }

  findOne(id: UserInterface['id']): UserInterface {
    const userFound = this.usersList.find((u) => u.id === id);
    if (!userFound) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return userFound;
  }

  update(id: UserInterface['id'], updateUserDto: UpdateUserDto): UserInterface {
    const userFound = this.findOne(id);

    if (updateUserDto.email !== undefined) {
      const userIndex = this.duplicate(
        'email',
        updateUserDto.email,
        userFound.id,
      );
      if (userIndex !== -1) {
        throw new ConflictException('Email is already in use');
      }
    }
    return Object.assign(userFound, updateUserDto);
  }

  remove(id: UserInterface['id']): void {
    this.findOne(id);
    this.usersList = this.usersList.filter((u) => u.id !== id);
  }
}
