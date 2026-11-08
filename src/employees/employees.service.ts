import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma, Role } from 'generated/prisma/client';

@Injectable()
export class EmployeesService {
  constructor(private databaseService: DatabaseService) {}

  private handlePrismaError(e: unknown, id?: number): never {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      switch (e.code) {
        case 'P2002':
          throw new ConflictException('Email already in use');

        case 'P2025':
          throw new NotFoundException(
            id ? `Employee id ${id} not found` : 'Record not found',
          );
      }
    }

    if (e instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException(e.toString().split('\n\n').at(-1));
    }

    throw e;
  }

  async create(createEmployeeDto: Prisma.EmployeesCreateInput) {
    try {
      return await this.databaseService.employees.create({
        data: createEmployeeDto,
      });
    } catch (e: unknown) {
      this.handlePrismaError(e);
    }
  }

  async findAll(role?: Role) {
    return this.databaseService.employees.findMany({
      where: { role },
    });
  }

  async findOne(id: number) {
    const employee = await this.databaseService.employees.findUnique({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Employee id ${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeesUpdateInput) {
    try {
      return await this.databaseService.employees.update({
        where: { id },
        data: updateEmployeeDto,
      });
    } catch (e: unknown) {
      this.handlePrismaError(e, id);
    }
  }

  async remove(id: number) {
    try {
      await this.databaseService.employees.delete({
        where: { id },
      });
    } catch (e: unknown) {
      this.handlePrismaError(e, id);
    }
  }
}
