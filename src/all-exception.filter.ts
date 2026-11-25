import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import type { ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';
import { MyLoggerService } from './my-logger/my-logger.service';
import { Prisma } from 'generated/prisma/client';

type ResponseObjType = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseObj: ResponseObjType = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      responseObj.statusCode = exception.getStatus();
      responseObj.response = exception.getResponse();
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      responseObj.statusCode = 422;

      responseObj.response = exception.message.replace(/\n/g, '');
    } else {
      responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseObj.response = 'Internal Server Error';
    }

    response.status(responseObj.statusCode).json(responseObj);
    this.logger.error(responseObj.response, AllExceptionFilter.name);
  }
}
