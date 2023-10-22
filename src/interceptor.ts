import {
  BadRequestException,
  CallHandler, ExecutionContext, Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, map, Observable, throwError } from "rxjs";
import type { ResponseFormat, ResponseInterceptorFormat } from "./types";

const getUnixTimestamp = () => Math.floor(Date.now() / 1000);

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map<ResponseFormat, ResponseInterceptorFormat>((data) => {
        const response = context.switchToHttp().getResponse();

        return {
          ...data,
          status: response.statusCode,
          timestamp: getUnixTimestamp(),
        };
      }),
      catchError((error) => {
        if (error instanceof BadRequestException) {
          const response = {
            message: error.message,
            data: error.getResponse(),
            status: error.getStatus(),
            timestamp: getUnixTimestamp(),
          };

          return throwError(() => new BadRequestException(response));
        }

        return throwError(() => error);
      }),
    );
  }
}