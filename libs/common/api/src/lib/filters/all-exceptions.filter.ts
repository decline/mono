import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Error } from '@mono/common/shared';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let message: string;
    let statusCode: number;

    if (exception instanceof HttpException) {
      message = typeof exception.getResponse() === 'string' ? (exception.getResponse() as string) : exception.message;
      statusCode = exception.getStatus();
    } else {
      message = 'Internal Server Error';
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const responseBody = <Error>{
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
