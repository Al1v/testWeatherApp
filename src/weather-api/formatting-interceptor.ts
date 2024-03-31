import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherFormattedResponseDto } from './dto/formatted-response.dto';

@Injectable()
export class ResponseFormattingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (!data || !data.data || !data.data.current) {
          return { message: 'No weather data available' };
        }
        const modifiedResponse = new WeatherFormattedResponseDto(data);
        return modifiedResponse;
      }),
    );
  }
}
