import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(_: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        const resp = {
          success: true,
        }

        if (response && typeof response === 'object' && 'data' in response) {
          resp['data'] = response.data;

          if ('message' in response) {
            resp['message'] = response.message;
          }

          if ('meta' in response) {
            resp['meta'] = response.meta;
          }

          return resp;
        }

        return {
          ...resp,
          data: response,
        }

      })
    );
  }

}