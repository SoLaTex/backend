import {
  BadRequestException,
  CallHandler, ExecutionContext, HttpException, Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { catchError, map, Observable, ObservableInput, throwError } from "rxjs";
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
        if (error instanceof HttpException) {
          const data = error.getResponse() as ResponseFormat;

          const response = {
            message: data.message,
            data: data.data,
            status: error.getStatus(),
            timestamp: getUnixTimestamp(),
          };

          return throwError(() => new HttpException(response, error.getStatus()));
        }

        return throwError(() => error);
      }),
    );
  }
}
