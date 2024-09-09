import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

/*
  customizing the response to be uniform to client
*/

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((res: unknown) => this.responseHandler(res, context)),
      catchError((err: HttpException) =>
        throwError(() => this.errorHandler(err, context)),
      ),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private responseHandler(res: unknown, context: ExecutionContext) {
    // const ctx = context.switchToHttp();
    // const request = ctx.getRequest();
    // const response = ctx.getResponse();
    // const statusCode = response.statusCode;

    return {
      status: 'success',
      message: null,
      data: res,
    };
  }
  private errorHandler(exception: HttpException, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    // const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = [exception.message];

    if (
      exception instanceof HttpException &&
      exception.getResponse() &&
      typeof exception.getResponse() === 'object' &&
      (exception.getResponse() as any)?.message
    ) {
      const resp = (exception.getResponse() as any).message;
      message = Array.isArray(resp) ? resp : [resp];
    }

    // PrismaClientInitializationError
    if (
      exception instanceof Error &&
      exception.name === 'PrismaClientInitializationError'
    ) {
      message = ['Prisma connection failed'];
    }

    // PrismaClientKnownRequestError
    if (
      exception instanceof Error &&
      exception.name === 'PrismaClientKnownRequestError'
    ) {
      status = 400;
      message = ['An error occurred. check payload'];
    }

    // PrismaClientValidationError
    if (
      exception instanceof Error &&
      exception.name === 'PrismaClientValidationError'
    ) {
      status = 400;
      message = ['Bad request, check submitted data'];
    }

    response.status(status).json({
      status: 'error',
      // path: request.url,
      message,
      data: null,
    });
  }
}
