import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
  } from '@nestjs/common';
  import { Observable, catchError, map, throwError } from 'rxjs';
  
  @Injectable()
  export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
      return next.handle().pipe(
        map((data) => ({
          success: true,
          message: data.message || 'Request was successful',
          data: data.data || data,
        })),
        catchError((error) => {
          const status = error instanceof HttpException ? error.getStatus() : error.statusCode;
  
          // Create a custom error response
          const response = {
            success: false,
            message:
              error instanceof HttpException
                ? (typeof error.getResponse() === 'string'
                    ? error.getResponse()
                    : (error.getResponse() as any).message) || 'An error occurred'
                : error.message,
            data: null,
          };
          // Return an observable with the custom error response
          return throwError(() => ({
            statusCode: status,
            ...response,
          }));
        }),
      );
    }
  }
  