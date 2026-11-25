import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  Ip,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from 'generated/prisma/client';
import { Role } from 'generated/prisma/client';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { MyLoggerService } from 'src/my-logger/my-logger.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name);

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeesCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({ default: false })
  @Get()
  findAll(@Ip() ip: string, @Query('role') role?: Role) {
    this.logger.log(`Request for All employees\t${ip}`);
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: { ttl: 1000, limit: 1 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeesUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
